import Ember from 'ember';
import QueryParams from 'ember-parachute';
import bblDemux from '../utils/bbl-demux';

import layerGroups from '../layer-groups';

const { merge } = Ember;

const queryParams = Object.keys(layerGroups)
  .reduce(
    (acc, cur) => {
      acc[layerGroups[cur].id] = {
        defaultValue: (layerGroups[cur].visible === undefined) ? true : !!layerGroups[cur].visible,
      };
      return acc;
    },
    {},
  );

// define new query params here:
export const mapQueryParams =
  new QueryParams(
    merge(
      queryParams,
      {
        'comm-type': {
          defaultValue: '',
        },
        c11: {
          defaultValue: true,
        },
        c12: {
          defaultValue: true,
        },
        c13: {
          defaultValue: true,
        },
        c14: {
          defaultValue: true,
        },
        c15: {
          defaultValue: true,
        },
        c21: {
          defaultValue: true,
        },
        c22: {
          defaultValue: true,
        },
        c23: {
          defaultValue: true,
        },
        c24: {
          defaultValue: true,
        },
        c25: {
          defaultValue: true,
        },
        allChecked: {
          defaultValue: [],
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
      const layers = ['pluto-fill', 'zma-fill', 'zd-fill'].filter(layer => map.getLayer(layer));
      const feature = map.queryRenderedFeatures(e.point, { layers })[0];
      const { bbl, ulurpno, zonedist } = feature.properties;

      if (bbl) {
        const { boro, block, lot } = bblDemux(bbl);
        this.transitionToRoute('lot', boro, block, lot);
      }

      if (ulurpno) {
        this.transitionToRoute('zma', ulurpno);
      }

      if (zonedist) {
        this.transitionToRoute('zoning-district', zonedist);
      }
    },
    setQueryParam(property, value) {
      this.set(property, value);
    },
    resetAll() {
      this.resetQueryParams();
    },
  },
});
