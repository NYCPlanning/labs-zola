import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ParentMixin } from 'ember-composability-tools';
import carto from '../utils/carto';

const { alias } = Ember.computed;

export default Ember.Component.extend(ParentMixin, {
  init(...args) {
    this._super(...args);

    // console.log(this.get('childComponents'));
    if (this.get('childComponents.length') > 1) {
      console.log('Warning: Only one layer-control per layer is supported.');
    }

    const config = this.get('config');
    const { id, sql } = config;
    const qps = this.get('qps');
    const thisQP = this.get(`qps.${id}`);

    this.setProperties({
      sql,
    });

    if (qps) {
      config.visible = thisQP;
      this.set(
        'visible',
        alias(`qps.${id}`),
      );
    }
  },

  tagName: '',
  qps: null,
  config: {},
  sql: '',

  @computed('config.visible')
  visible() {
    return this.get('config.visible');
  },

  @computed('config.type')
  isCarto(type) {
    return type === 'carto';
  },

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

  buildRangeSQL(column = '', range = [0, 1]) {
    let sql = this.get('config.sql');

    sql += ` WHERE ${column} > '${range[0]}' AND ${column} < '${range[1]}'`;

    return sql;
  },

  buildMultiSelectSQL(column = '', values = ['a', 'b']) {
    let sql = this.get('config.sql');
    const valuesCleaned = values.map(value => `'${value}'`).join(',');

    if (!Ember.isEmpty(values)) {
      sql += ` WHERE ${column} IN (${valuesCleaned})`;
    }
    console.log(sql);
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
  },
});
