import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { set, computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { alias } from '@ember/object/computed';
import { zoningDistrictGroups, commercialOverlays } from '../components/layer-palette';

// define new query params here:
export const mapQueryParams = new QueryParams(
  assign(
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

// TODO renable these fucking worthless QPs mapQueryParams.Mixin
export default class ApplicationController extends Controller.extend() {
  @service('layerGroups')
  layerGroupService;

  @service()
  mainMap;

  @service()
  metrics;

  @alias('layerGroupService.visibleLayerGroups')
  layerGroups;

  boro = '';

  block = '';

  lot = '';

  // Print View Settings
  printViewOrientation = 'portrait';

  printViewPaperSize = 'letter';

  printViewShowMap = true;

  printViewShowLegend = true;

  printViewShowContent = true;

  @computed('printViewShowMap', 'printViewShowLegend', 'printViewShowContent')
  get printViewHiddenAreas() {
    const hiddenAreasClasses = [];

    if (!this.get('printViewShowMap')) hiddenAreasClasses.push('no-map');
    if (!this.get('printViewShowLegend')) hiddenAreasClasses.push('no-legend');
    if (!this.get('printViewShowContent')) hiddenAreasClasses.push('no-content');

    return hiddenAreasClasses.join(' ');
  }

  @computed('printViewHiddenAreas', 'print', 'printViewPaperSize', 'printViewOrientation', 'printViewHiddenAreas')
  get printViewClasses() {
    const orientation = this.get('printViewOrientation');
    const size = this.get('printViewPaperSize');
    const areas = this.get('printViewHiddenAreas');

    return this.get('print') ? `paper ${size} ${orientation} ${areas}` : '';
  }

  @computed('queryParamsState')
  get isDefault() {
    const state = this.get('queryParamsState') || {};
    const values = Object.values(state);

    return values.isEvery('changed', false);
  }

  @action
  saveAddress(address) {
    const bookmarks = this.store.peekAll('bookmark');

    const isUnique = bookmarks.every(
      bookmark => bookmark.get('address') !== address.address,
    );

    set(address, 'type', 'address');

    if (isUnique) {
      this.store.createRecord('bookmark', address).save();
    }
  }

  @action
  setQueryParam(property, value) {
    this.set(property, value);
  }

  @action
  resetQueryParams() {
    this.resetQueryParams();
  }
}
