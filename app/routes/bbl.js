import Ember from 'ember';
import bblDemux from '../utils/bbl-demux';

export default Ember.Route.extend({
  model(params) {
    const bbl = bblDemux(params.bbl);
    this.transitionTo('lot', bbl.boro, bbl.block, bbl.lot);
  },
});
