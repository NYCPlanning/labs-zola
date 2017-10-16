import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    return this.store.findRecord('zoning-district', params.zonedist);
  },

  afterModel(model) {
    this.set('mainMap.selected', model);
  },

  bounds: alias('mainMap.bounds'),

  actions: {
    fitBounds() {
      const mainMap = this.get('mainMap');
      const map = mainMap.mapInstance;
      map.fitBounds(this.get('bounds'));
    },
  },
});
