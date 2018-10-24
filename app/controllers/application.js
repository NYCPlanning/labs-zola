import ObjectProxy from '@ember/object/proxy';
import Controller from '@ember/controller';
import { merge } from '@ember/polyfills';
import EmberObject, { set, computed as computedProp } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import bblDemux from '../utils/bbl-demux';

import Geometric from '../mixins/geometric';
import trackEvent from '../utils/track-event'; // eslint-disable-line

// define new query params here:
export const mapQueryParams = new QueryParams(
  merge(
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
      R10: { defaultValue: true },
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
      'aerials-2016': { defaultValue: true },
      'aerials-1924': { defaultValue: false },
      'aerials-2014': { defaultValue: false },
      'aerials-2012': { defaultValue: false },
      'aerials-2010': { defaultValue: false },
      'aerials-2008': { defaultValue: false },
      'aerials-2006': { defaultValue: false },
      'aerials-2004': { defaultValue: false },
      'aerials-20012': { defaultValue: false },
      'aerials-1996': { defaultValue: false },
      'aerials-1951': { defaultValue: false },

      'layer-groups': {
        defaultValue: [],
        refresh: true,
      },
    },
  ),
);

export default Controller.extend(mapQueryParams.Mixin, {
  init(...args) {
    this._super(...args);

    const proxy = ObjectProxy.create({
      content: this,
    });

    this.set('qps', proxy);
  },

  'layer-groups': computedProp('model.layerGroups.@each.visible', {
    get() {
      const { model } = this;

      if (model) {
        return model.layerGroups.filterBy('visible').mapBy('id').sort();
      }

      return [];
    },
    set(key, value) {
      if (Array.isArray(value) && this.model && value.length) {
        this.model.layerGroups.forEach((layerGroup) => {
          if (value.includes(layerGroup.id)) {
            layerGroup.set('visible', true);
          } else {
            layerGroup.set('visible', false);
          }
        });
      }
    },
  }),

  mainMap: service(),
  metrics: service(),
  registeredLayers: service(),
  mapMouseover: service(),
  boro: 0,
  block: 0,
  lot: 0,

  isDefault: computedProp('queryParamsState', function() {
    const state = this.get('queryParamsState');
    const values = Object.values(state);

    return values.isEvery('changed', false);
  }),

  actions: {
    transitionTo(...args) {
      this.transitionToRoute(...args);
    },
    saveAddress(address) {
      const bookmarks = this.store.peekAll('bookmark');

      const isUnique = bookmarks.every(
        bookmark => bookmark.get('address') !== address.address,
      );

      set(address, 'type', 'address');

      if (isUnique) {
        this.store.createRecord('bookmark', address).save();
      }
    },
    routeToLot(e) {
      const map = e.target;
      const { mainMap } = this;

      if (mainMap.get('drawMode')) return;

      // only query layers that are available in the map
      const layers = this.get('registeredLayers.clickableAndVisibleLayerIds');
      const feature = map.queryRenderedFeatures(e.point, { layers })[0];

      const highlightedLayer = this.get('mapMouseover.highlightedLayer');

      if (feature) {
        if (highlightedLayer === feature.layer.id) {
          const {
            bbl,
            ulurpno,
            zonedist,
            sdlbl,
            splbl,
            overlay,
            cartodb_id, // eslint-disable-line
            ceqr_num, // eslint-disable-line
          } = feature.properties;

          const featureFragment = EmberObject.extend(Geometric, {
            geometry: feature.geometry,
          }).create();

          mainMap.set('selected', featureFragment);

          if (bbl && !ceqr_num) { // eslint-disable-line
            const { boro, block, lot } = bblDemux(bbl);
            this.transitionToRoute('lot', boro, block, lot);
          }

          if (ulurpno) {
            this.transitionToRoute('zma', ulurpno);
          }

          if (zonedist) {
            mainMap.set('shouldFitBounds', false);
            this.transitionToRoute('zoning-district', zonedist);
          }

          if (sdlbl) {
            this.transitionToRoute('special-purpose-district', cartodb_id);
          }

          if (splbl) {
            this.transitionToRoute('special-purpose-subdistricts', cartodb_id);
          }

          if (overlay) {
            mainMap.set('shouldFitBounds', false);
            this.transitionToRoute('commercial-overlay', overlay);
          }

          if (ceqr_num) { // eslint-disable-line
            window.open(`https://zap-api.planninglabs.nyc/ceqr/${ceqr_num}`, '_blank'); // eslint-disable-line
          }
        }
      }
    },

    @trackEvent('Map Search', 'Clicked result', 'searchTerms')
    handleSearchSelect(result) {
      const { mainMap } = this;
      const mapInstance = mainMap.get('mapInstance');
      const { type } = result;

      mainMap.set('currentAddress', null);

      this.setProperties({
        selected: 0,
        focused: false,
      });

      if (type === 'lot') {
        const { boro, block, lot } = bblDemux(result.bbl);
        this.set('searchTerms', result.label);
        this.transitionToRoute('lot', boro, block, lot);
      }

      if (type === 'zma') {
        this.set('searchTerms', result.label);
        this.transitionToRoute('zma', result.ulurpno);
      }

      if (type === 'zoning-district') {
        mainMap.set('shouldFitBounds', true);
        this.transitionToRoute('zoning-district', result.label);
      }

      if (type === 'neighborhood') {
        this.set('searchTerms', result.neighbourhood);
        const center = result.coordinates;
        mapInstance.flyTo({
          center,
          zoom: 13,
        });
      }

      if (type === 'address') {
        const center = result.coordinates;
        mainMap.set('currentAddress', center);

        this.set('searchTerms', result.label);
        this.saveAddress({ address: result.label, coordinates: result.coordinates });

        if (mapInstance) {
          mapInstance.flyTo({
            center,
            zoom: 15,
          });
          mapInstance.once('moveend', () => { this.transitionToRoute('index'); });
        }
      }

      if (type === 'special-purpose-district') {
        this.set('searchTerms', result.sdname);
        this.transitionToRoute('special-purpose-district', result.cartodb_id);
      }

      if (type === 'commercial-overlay') {
        this.set('searchTerms', result.label);
        this.transitionToRoute('commercial-overlay', result.label);
      }
    },

    setQueryParam(property, value) {
      this.set(property, value);
    },

    @trackEvent('Layer Palette', 'Reset query params', 'isDefault')
    resetQueryParams() {
      this.resetQueryParams();
    },

    flyTo() {
      const { boro: { code: boro }, block, lot } = this;

      this.transitionToRoute('lot', boro, block, lot);
    },
  },
});
