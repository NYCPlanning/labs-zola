import Controller from '@ember/controller';
import { merge } from '@ember/polyfills';
import { set, computed as computedProp } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import { alias } from '@ember/object/computed';
import bblDemux from '../utils/bbl-demux';
import { zoningDistrictGroups, commercialOverlays } from '../components/layer-palette';

// import Geometric from '../mixins/geometric';
import trackEvent from '../utils/track-event'; // eslint-disable-line

// define new query params here:
export const mapQueryParams = new QueryParams(
  merge(
    {
      'comm-type': { defaultValue: '' },
      search: { defaultValue: false },
      allChecked: { defaultValue: [] },
      selectedZoning: {
        defaultValue: zoningDistrictGroups
          .map(({ codes }) => codes)
          .reduce((acc, curr) => acc.concat(curr))
          .sort(),
      },
      selectedOverlays: {
        defaultValue: commercialOverlays
          .map(({ codes }) => codes)
          .reduce((acc, curr) => acc.concat(curr))
          .sort(),
      },
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

      print: { defaultValue: false },
    },
  ),
);

export default Controller.extend(mapQueryParams.Mixin, {
  layerGroupService: service('layerGroups'),
  layerGroups: alias('layerGroupService.visibleLayerGroups'),

  mainMap: service(),
  metrics: service(),
  boro: '',
  block: '',
  lot: '',

  // Print View Settings
  printViewOrientation: 'portrait',
  printViewPaperSize: 'letter',
  printViewShowMap: true,
  printViewShowLegend: true,
  printViewShowContent: true,

  printViewHiddenAreas: computedProp('printViewShowMap', 'printViewShowLegend', 'printViewShowContent', function() {
    const hiddenAreasClasses = [];

    if (!this.get('printViewShowMap')) hiddenAreasClasses.push('no-map');
    if (!this.get('printViewShowLegend')) hiddenAreasClasses.push('no-legend');
    if (!this.get('printViewShowContent')) hiddenAreasClasses.push('no-content');

    return hiddenAreasClasses.join(' ');
  }),

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

    // @trackEvent('Map Search', 'Clicked result', 'searchTerms')
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

    // @trackEvent('Layer Palette', 'Reset query params', 'isDefault')
    resetQueryParams() {
      this.resetQueryParams();
    },

    handleLookupSuccess(center, zoom, bbl) {
      // if onSuccess from labs-bbl-lookup includes bbl, transition to lot route for that bbl
      // otherwise flyTo the block
      if (bbl) {
        const { boro, block, lot } = bblDemux(bbl);
        this.transitionToRoute('lot', boro, block, lot);
      } else {
        this.get('mainMap.mapInstance').flyTo({ center, zoom });
      }
    },
  },
});
