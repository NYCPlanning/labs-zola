import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import carto from '../utils/carto';

const { alias, reads } = Ember.computed;
const { warn } = Ember.Logger;
const { service } = Ember.inject;

const { copy, merge, set } = Ember;

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  init(...args) {
    this._super(...args);

    const { config, mapMouseover, tooltip } =
      this.getProperties('config', 'mapMouseover', 'tooltip');
    const { sql } = config;

    if (this.get('childComponents.length') > 1) {
      warn('Only one layer-control per layer is supported.');
    }

    this.setProperties({
      sql,
    });
  },

  tagName: 'span',
  qps: null,
  config: {},
  sql: '',
  paintObject: {},
  visible: false,

  @computed('config.layers.@each.id')
  layerIds(layers) {
    return layers.mapBy('layer.id');
  },

  @computed('isCarto', 'configWithTemplate.isSuccessful', 'config', 'visible')
  isReady(isCarto, successful, config, visible) {
    return !!(
      ((isCarto && successful) || !isCarto) && (config && visible)
    );
  },

  'query-param': alias('config.id'),
  queryParamBoundKey: 'visible',

  @computed('config.type')
  isCarto(type) {
    return type === 'carto';
  },

  layers: alias('config.layers'),

  @computed('sql')
  configWithTemplate(sql) {
    return this.get('templateTask').perform(sql);
  },

  templateTask: task(function* (sql) {
    const { minzoom = 0 } = this.get('config');
    return yield carto.getVectorTileTemplate([sql])
      .then(
        template => ({
          type: 'vector',
          tiles: [template],
          minzoom,
        }),
      )
      .then(
        (optionsObject) => {
          this.set('config.options', optionsObject);
          return optionsObject;
        },
      );
  }).restartable(),

  @computed('config', 'isCarto', 'sql')
  sourceOptions(config, isCarto) {
    if (isCarto) return this.get('configWithTemplate.value');
    return config;
  },

  buildRangeSQL(column = '', range = [0, 1] || ['a', 'b']) {
    let sql = this.get('config.sql');
    let cleanRange = range;

    if (typeof range[0] === 'string') {
      cleanRange = cleanRange.map(step => `'${step}'`);
    }

    sql += ` WHERE ${column} > ${cleanRange[0]} AND ${column} < ${cleanRange[1]}`;

    return sql;
  },

  buildMultiSelectSQL(column = '', values = [0, 1] || ['a', 'b']) {
    let sql = this.get('config.sql');

    const valuesCleaned = values.map(value => `'${value}'`).join(',');
    if (!Ember.isEmpty(values)) {
      sql += ` WHERE ${column} IN (${valuesCleaned})`;
    }

    return sql;
  },

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, column, value) {
      const sql = this[method](column, value);
      this.set('sql', sql);
    },
    updatePaintFor(layerId, newPaintStyle) {
      const layers = this.get('config.layers');
      const targetLayerIndex = layers.findIndex(el => el.layer.id === layerId);
      const targetLayer = layers.objectAt(targetLayerIndex);
      const copyTargetLayer = copy(targetLayer, true);
      const formattedLayer = merge(copyTargetLayer.layer, { paint: newPaintStyle });
      set(targetLayer, 'layer', formattedLayer);
    },
  },
});
