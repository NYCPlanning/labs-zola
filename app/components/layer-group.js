import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';
import carto from '../utils/carto';

export default Ember.Component.extend(ChildMixin, {
  init(...args) {
    this._super(...args);
    const { type, sql, minzoom = 0 } = this.get('config');

    if (type === 'carto' && sql) {
      carto.getVectorTileTemplate([sql])
        .then(
          template => ({
            type: 'vector',
            tiles: [template],
            minzoom,
          }),
        )
        .then(
          (optionsObject) => {
            this.setProperties({
              'config.options': optionsObject,
              resolved: true,
            });
          },
        );
    }
  },
  tagName: '',
  visible: true,
  resolved: false,

  didInsertParent(...args) {
    this._super(...args);

    // const parentMap = this.get('parentComponent.map');
  },
});
