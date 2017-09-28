import Ember from 'ember';
import QueryParams from 'ember-parachute';
import bblDemux from '../utils/bbl-demux';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import layerGroups from '../layer-groups';

const { merge, computed: { or } } = Ember;

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
        'comm-type': { defaultValue: '' },
        BP: { defaultValue: true },
        C1: { defaultValue: true },
        C2: { defaultValue: true },
        C3: { defaultValue: true },
        C4: { defaultValue: true },
        C5: { defaultValue: true },
        C6: { defaultValue: true },
        C7: { defaultValue: true },
        C8: { defaultValue: true },
        M1: { defaultValue: true },
        M2: { defaultValue: true },
        M3: { defaultValue: true },
        PA: { defaultValue: true },
        R1: { defaultValue: true },
        R2: { defaultValue: true },
        R3: { defaultValue: true },
        R4: { defaultValue: true },
        R5: { defaultValue: true },
        R6: { defaultValue: true },
        R7: { defaultValue: true },
        R8: { defaultValue: true },
        R9: { defaultValue: true },
        c11: { defaultValue: true },
        c12: { defaultValue: true },
        c13: { defaultValue: true },
        c14: { defaultValue: true },
        c15: { defaultValue: true },
        c21: { defaultValue: true },
        c22: { defaultValue: true },
        c23: { defaultValue: true },
        c24: { defaultValue: true },
        c25: { defaultValue: true },
        allChecked: { defaultValue: [] },
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

  @computed('queryParamsState')
  isDefault(state) {
    const values = Object.values(state);

    return values.isEvery('changed', false);
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
    resetQueryParams() {
      this.resetQueryParams();
    },
    resetAll() {
      this.resetQueryParams();
    },
  },
});
