import Ember from 'ember';
import bblDemux from '../utils/bbl-demux';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return this.store.findRecord('lot', id);
  },

  afterModel(model) {
    const mainMap = this.get('mainMap');
    mainMap.set('selected', model);
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
