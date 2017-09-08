import Ember from 'ember';
import bblDemux from '../utils/bbl-demux';

export default Ember.Controller.extend({

  actions: {
    routeToLot(e) {
      const feature = e.target.queryRenderedFeatures(e.point, { layers: ['pluto-fill'] })[0];
      const { bbl } = feature.properties;

      if (bbl) {
        const { boro, block, lot } = bblDemux(bbl);
        this.transitionToRoute('lot', boro, block, lot);
      }
    },
  },
});
