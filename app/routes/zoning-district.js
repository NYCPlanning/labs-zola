import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    return this.store.findRecord('zoning-district', params.zonedist);
  },

  afterModel(model) {
    const mainMap = this.get('mainMap');
    mainMap.set('selected', model);
  },

  actions: {
    didTransition() {
      this.get('mainMap').set('shouldFitBounds', true);
    },
  },
});
