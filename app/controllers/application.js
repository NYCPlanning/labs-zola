import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    routeToLot(e) {
      const feature = e.target.queryRenderedFeatures(e.point, { layers: ['pluto-fill'] })[0];
      const { bbl } = feature.properties;

      if (bbl) {
        const bblString = bbl.toString();
        const boro = bblString.substring(0, 1);
        const block = parseInt(bblString.substring(1, 6), 10);
        const lot = parseInt(bblString.substring(6), 10);

        this.transitionToRoute('lot', boro, block, lot);
      }
    },
  },
});
