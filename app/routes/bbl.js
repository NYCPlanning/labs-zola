import Route from '@ember/routing/route';
import bblDemux from '../utils/bbl-demux';

export default Route.extend({
  model(params) {
    const bbl = bblDemux(params.bbl);
    this.transitionTo('map-feature.lot', bbl.boro, bbl.block, bbl.lot);
  },
});
