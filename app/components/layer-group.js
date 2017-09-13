import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import { ChildMixin } from 'ember-composability-tools';
import carto from '../utils/carto';
import SqlBuilder from '../utils/sql-builder';

export default Ember.Component.extend(ChildMixin, {
  tagName: '',
  visible: true,

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

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
  },
});
