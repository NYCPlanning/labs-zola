import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ChildMixin } from 'ember-composability-tools';
import carto from '../utils/carto';
import SqlBuilder from '../utils/sql-builder';

const { alias } = Ember.computed;

export default Ember.Component.extend(ChildMixin, {
  init(...args) {
    this._super(...args);
    const config = this.get('config');
    const { id } = config;
    const qps = this.get('qps');
    const thisQP = this.get(`qps.${id}`);

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

  @computed('config.visible')
  visible() {
    return this.get('config.visible');
  },

  @computed('config.type')
  isCarto(type) {
    return type === 'carto';
  },

  @computed('config.sql')
  get sql() {
    return this.get('config.sql');
  },
  set sql(value) {
    this.set('config.sql', value);
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

  @computed('config', 'isCarto')
  sourceOptions(config, isCarto) {
    if (isCarto) return this.get('configWithTemplate.value');
    return config;
  },

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
  },
});
