import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ParentMixin } from 'ember-composability-tools';
import carto from '../utils/carto';
import queryParamMap from '../mixins/query-param-map';
import replacePaintStyleIn from '../utils/replace-paint-style-in';

const { alias } = Ember.computed;
const { warn } = Ember.Logger;

export default Ember.Component.extend(ParentMixin, queryParamMap, {
  init(...args) {
    this._super(...args);

    if (this.get('childComponents.length') > 1) {
      warn('Only one layer-control per layer is supported.');
    }

    const { config, qps } =
      this.getProperties('config', 'qps');
    const queryParam = this.get('query-param');
    const thisQP = this.get(`qps.${queryParam}`);
    const { sql } = config;
    let { visible } = config;

    if (qps) {
      visible = thisQP;
    }

    this.setProperties({
      sql,
      visible,
    });
  },

  tagName: 'span',
  qps: null,
  config: {},
  sql: '',
  paintObject: {},
  visible: true,

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
      const config = this.get('config');

      this.set(
        'config',
        replacePaintStyleIn(
          config,
          layerId,
          newPaintStyle,
        ),
      );

      // hack
      this.set('didUpdateLayers', Math.random());
    },
  },
});
