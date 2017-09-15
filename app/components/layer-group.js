import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import carto from '../utils/carto';

const { alias } = Ember.computed;

export default Ember.Component.extend({
  init(...args) {
    this._super(...args);
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

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(sqlString) {
      this.set('sql', sqlString);
    },
  },
});
