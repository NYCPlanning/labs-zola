import Ember from 'ember';
import bblDemux from '../utils/bbl-demux';
import trackPage from '../mixins/track-page';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return this.store.findRecord('lot', id);
  },

  afterModel(model) {
    this.set('mainMap.selected', model);
  },

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },
}, trackPage);
