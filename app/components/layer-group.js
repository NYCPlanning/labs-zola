import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import carto from '../utils/carto';

const { copy, merge, set } = Ember;

const { service } = Ember.inject;

const { alias } = Ember.computed;
const { warn } = Ember.Logger;

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  init(...args) {
    this._super(...args);

    const config = this.get('config');
    const { sql } = config;

    if (this.get('childComponents.length') > 1) {
      warn('Only one layer-control per layer is supported.');
    }

    this.setProperties({
      sql,
    });
  },

  registeredLayers: service(),
  mainMap: service(),

  tagName: '',
  qps: null,
  config: {},
  sql: '',
  visible: false,

  @computed('config.layers')
  minzoom(layers) {
    const allZooms = layers.map(layer => layer.layer.minzoom).filter(zoom => !!zoom);
    if (allZooms.length) return Math.min(...allZooms);
    return false;
  },

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

  @computed('registeredLayers.visibleLayerIds')
  before() {
    const allLayerGroups = this.get('registeredLayers.layers');
    const position = allLayerGroups.map(layerGroup => layerGroup.config.id).indexOf(this.get('config.id'));

    // walk all layergroups that should be displayed above this one
    for (let i = position + 1; i < allLayerGroups.length; i += 1) {
      const config = allLayerGroups[i].config;
      const bottomLayer = config.layers[0].layer.id;
      const map = this.get('mainMap.mapInstance');

      // if the bottom-most layer of the layergroup exists on the map, use it as the 'before'
      if (map.getLayer(bottomLayer)) {
        return bottomLayer;
      }
    }

    // if we can't find any before when walking the layergroups, use this 'global before'
    return 'waterway-label';
  },

  layers: alias('config.layers'),

  @computed('sql')
  configWithTemplate(sql) {
    if (sql) {
      return this.get('templateTask').perform(sql);
    }

    return null;
  },

  templateTask: task(function* (sql) {
    const { minzoom = 0 } = this.get('config');
    return yield carto.getVectorTileTemplate(sql)
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
    let sql = this.get('config.sql')[0];

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
      this.set('sql', [sql]);
    },
    updatePaintFor(layerId, newPaintStyle) {
      const layers = this.get('config.layers');
      const targetLayerIndex = layers.findIndex(el => el.layer.id === layerId);
      const targetLayer = layers.objectAt(targetLayerIndex);
      const copyTargetLayer = copy(targetLayer, true);
      copyTargetLayer.layer.paint = merge(copyTargetLayer.layer.paint, newPaintStyle);
      set(targetLayer, 'layer', copyTargetLayer.layer);
    },
  },
});
