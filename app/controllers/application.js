import Ember from 'ember';
import QueryParams from 'ember-parachute';
import bblDemux from '../utils/bbl-demux';

import pluto from '../layer-groups/pluto';
import facilities from '../layer-groups/facilities';
import aerialRaster from '../layer-groups/aerial-raster';
import zoningDistricts from '../layer-groups/zoning-districts';
import commercialOverlays from '../layer-groups/commercial-overlays';
import zoningMapAmendments from '../layer-groups/zoning-map-amendments';

const { merge } = Ember;

const layerGroups =
  [
    pluto,
    facilities,
    aerialRaster,
    zoningDistricts,
    commercialOverlays,
    zoningMapAmendments,
  ];

// grab query params from layer configs
const queryParams = layerGroups
  .reduce(
    (acc, cur) => {
      acc[cur.id] = {
        defaultValue: (cur.visible === undefined) ? true : !!cur.visible,
      };
      return acc;
    },
    {},
  );

const defaultMax = new Date();
const defaultStart = [1032370151000, defaultMax.getTime()];

// define new query params here:
queryParams['zma-effective'] = {
  defaultValue: defaultStart,
  serialize([min, max]) {
    return [min, max].map(val => parseInt(val, 10));
  },
  deserialize([min, max]) {
    return [min, max].map(val => parseInt(val, 10));
  },
};

export const mapQueryParams =
  new QueryParams(
    merge(
      queryParams,
      {
        'comm-type': {
          defaultValue: '',
        },
      },
    ),
  );

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
      const map = e.target;
      // only query layers that are available in the map
      const layers = ['pluto-fill', 'zma-fill'].filter(layer => map.getLayer(layer));
      const feature = map.queryRenderedFeatures(e.point, { layers })[0];
      const { bbl, ulurpno } = feature.properties;

      if (bbl) {
        const { boro, block, lot } = bblDemux(bbl);
        this.transitionToRoute('lot', boro, block, lot);
      }

      if (ulurpno) {
        this.transitionToRoute('zma', ulurpno);
      }
    },
    setQueryParam(property, value) {
      this.set(property, value);
    },
  },
});
