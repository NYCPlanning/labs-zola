import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { set, computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import { alias } from '@ember/object/computed';
import { next } from '@ember/runloop';
import { zoningDistrictGroups, commercialOverlays } from '../components/layer-palette';
import { defaultLayerGroupState } from '../routes/application';


const defaultLayerGroups = defaultLayerGroupState.filterBy('visible', true).map(layer => layer.id);

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
        defaultValue: defaultLayerGroups,
        refresh: true,
        as: 'layer-groups',
      },

      print: { defaultValue: false },
    },
  ),
);

export default class ApplicationController extends Controller.extend(mapQueryParams.Mixin) {
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

  /* TODO: FIND OUT WHY THIS ERROR IS HAPPENING
  Assertion Failed: You modified "numberMenuItems" twice on <labs-zola@component:labs-ui/layer-groups-container::ember702>
  in a single render. It was rendered in "component:labs-ui/layer-groups-container" and modified in "component:labs-ui/layer-group-toggle".
  This was unreliable and slow in Ember 1.x and is no longer supported. See https://github.com/emberjs/ember.js/issues/13948 for more details.
  */
  @action
  resetAllParams() {
    // "next" here fixes an issue where layers that were OFF by default and then turned ON by the user would not change back when the reset map layers button
    // was clicked. While "next" fixes this issue on the app ONLY WHEN ONE LAYER IS TURNED ON, we still get the error outlined above in the console,
    // and it does not work when more than ONE layer is turned on
    next(() => {
      this.resetQueryParams();
    });
  }
}
