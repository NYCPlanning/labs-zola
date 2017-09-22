import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  afterModel() {
    this.get('mainMap').resetBounds();
  },

  actions: {
    didTransition() {
      const mapInstance = this.get('mainMap.mapInstance');

      if (mapInstance) {
        Ember.run.later(() => {
          mapInstance.resize();
        }, 1000);
      }
    },
  },
});
