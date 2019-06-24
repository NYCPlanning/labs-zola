import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import config from 'labs-zola/config/environment';
import { zoningDistrictGroups, commercialOverlays } from '../components/layer-palette';

const { defaultLayerGroupState } = config;
const defaultLayerGroups = defaultLayerGroupState.filterBy('visible').mapBy('id').sort();

// define new query params here:
export const mapQueryParams = new QueryParams(
  assign(
    {
      'comm-type': { defaultValue: '' },
      // search: { defaultValue: false },
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

  /**
   * Ember Parachute override
   * similar to "init"
   * used to send callbacks to the layerGroup aggregate service and initialize observers
   */
  setup() {
    this.layerGroupService.set('layerGroupsDidChange', this.handleLayerGroupChange);

    this.get('layerGroupService').initializeObservers();
  }

  @action
  handleLayerGroupChange(visibleLayerGroups) {
    this.set('layerGroups', visibleLayerGroups);
  }

  @action
  setModelsToDefault() {
    this.get('layerGroupService').rollbackLayerGroups();
  }

  @computed('queryParamsState')
  get isDefault() {
    const state = this.get('queryParamsState') || {};
    const values = Object.values(state);

    return values.isEvery('changed', false);
  }

  // Print View Settings and computeds
  // TODO: Refactor this into a separate component
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
}
