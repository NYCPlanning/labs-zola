import Ember from 'ember';
import QueryParams from 'ember-parachute';
import bblDemux from '../utils/bbl-demux';

import pluto from '../layer-groups/pluto';
import facilities from '../layer-groups/facilities';
import aerialRaster from '../layer-groups/aerial-raster';
import zoningDistricts from '../layer-groups/zoning-districts';
import commercialOverlays from '../layer-groups/commercial-overlays';
import zoningMapAmendments from '../layer-groups/zoning-map-amendments';

const layerGroups =
  [
    pluto,
    facilities,
    aerialRaster,
    zoningDistricts,
    commercialOverlays,
    zoningMapAmendments,
  ];

const queryParams = layerGroups
  .mapBy('id')
  .reduce(
    (acc, cur) => {
      acc[cur] = {
        defaultValue: (cur.visible === undefined) ? true : !!cur.visible,
      };

      return acc;
    },
    {},
  );

queryParams['zoning-map-amendments-effective-slider'] = {
  defaultValue: [1293840000000, 2493072000000],
  serialize([min, max]) {
    return [parseInt(min), parseInt(max)];
  },
  deserialize([min, max]) {
    return [parseInt(min), parseInt(max)];
  },
};

export const mapQueryParams =
  new QueryParams(queryParams);

export default Ember.Controller.extend(mapQueryParams.Mixin, {
  init(...args) {
    this._super(...args);

    const proxy = Ember.ObjectProxy.create({
      content: this,
    });

    this.set('qps', proxy);
  },
  actions: {
    transitionTo(...args) {
      this.transitionToRoute(...args);
    },
    routeToLot(e) {
      const feature = e.target.queryRenderedFeatures(e.point, { layers: ['pluto-fill'] })[0];
      const { bbl } = feature.properties;

      if (bbl) {
        const { boro, block, lot } = bblDemux(bbl);
        this.transitionToRoute('lot', boro, block, lot);
      }
    },
    setQueryParam(property, value) {
      this.set(property, value);
    },
  },
});
