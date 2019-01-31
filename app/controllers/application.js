import ObjectProxy from '@ember/object/proxy';
import Controller from '@ember/controller';
import { merge } from '@ember/polyfills';
import { set, computed as computedProp } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import { alias } from '@ember/object/computed';
import bblDemux from '../utils/bbl-demux';

// import Geometric from '../mixins/geometric';
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
      search: { defaultValue: false },
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

      layerGroups: {
        defaultValue: [],
        refresh: true,
        as: 'layer-groups',
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

  layerGroupService: service('layerGroups'),
  layerGroups: alias('layerGroupService.visibleLayerGroups'),

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
        this.transitionToRoute('zma', result.ulurpno, { queryParams: { search: true } });
      }

      if (type === 'zoning-district') {
        this.set('searchTerms', result.label);
        this.transitionToRoute('zoning-district', result.label, { queryParams: { search: true } });
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
        this.transitionToRoute('special-purpose-district', result.cartodb_id, { queryParams: { search: true } });
      }

      if (type === 'commercial-overlay') {
        this.set('searchTerms', result.label);
        this.transitionToRoute('commercial-overlay', result.label, { queryParams: { search: true } });
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
