import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    return this.store.findRecord('zoning-district', params.zonedist);
  },

  afterModel(model) {
    this.set('mainMap.selected', model);
  },

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },

  actions: {
    didTransition() {
      this.get('mainMap').set('shouldFitBounds', true);
    },
  },
});
