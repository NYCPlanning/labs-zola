import Ember from 'ember';
import bblDemux from '../utils/bbl-demux';

export default Ember.Route.extend({
  model(params) {
    const id = bblDemux(params);
    return this.store.findRecord('lot', id);
  },
});
