import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  actions: {
    didTransition() {
      const mainMap = this.get('mainMap');
      mainMap.setProperties({
        selected: null,
        shouldFitBounds: false,
      });
      if (mainMap.mapInstance) mainMap.mapInstance.resize();
    },
  },
});
