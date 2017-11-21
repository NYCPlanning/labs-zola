import Ember from 'ember';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Route.extend({
  mainMap: service(),
  model(params) {
    return this.store.findRecord('commercial-overlay', params.id);
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
