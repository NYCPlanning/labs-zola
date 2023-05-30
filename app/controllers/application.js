import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import QueryParams from 'ember-parachute';
import config from 'labs-zola/config/environment';

const {
  defaultLayerGroupState,
  zoningDistrictOptionSets,
  commercialOverlaysOptionSets,
  cityCouncilDistrictsOptionSets,
  floodplainEfirm2007OptionSets,
  floodplainPfirm2015OptionSets,
} = config;

const defaultLayerGroups = defaultLayerGroupState
  .filter(layerGroup => layerGroup.visible)
  .map(layerGroup => layerGroup.id)
  .sort();

const defaultSelectedOverlays = commercialOverlaysOptionSets
  .map(({ codes }) => codes)
  .reduce((acc, curr) => acc.concat(curr))
  .sort();

const defaultSelectedZoningDistricts = zoningDistrictOptionSets
  .map(({ codes }) => codes)
  .reduce((acc, curr) => acc.concat(curr))
  .sort();

const defaultSelectedFirmOptionSets = floodplainEfirm2007OptionSets
  .map(({ codes }) => codes)
  .reduce((acc, curr) => acc.concat(curr))
  .sort();

const defaultSelectedPfirmOptionSets = floodplainPfirm2015OptionSets
  .map(({ codes }) => codes)
  .reduce((acc, curr) => acc.concat(curr))
  .sort();

const defaultSelectedCouncilDistricts =  ['2013'];

// define new query params here:
export const mapQueryParams = new QueryParams(
  assign(
    {
      layerGroups: {
        defaultValue: defaultLayerGroups,
        refresh: true,
        as: 'layer-groups',
      },

      selectedZoning: {
        defaultValue: defaultSelectedZoningDistricts,
      },

      selectedOverlays: {
        defaultValue: defaultSelectedOverlays,
      },

      selectedCouncilDistricts: {
        defaultValue: defaultSelectedCouncilDistricts,
      },

      selectedFirm: {
        defaultValue: defaultSelectedFirmOptionSets,
      },

      selectedPfirm: {
        defaultValue: defaultSelectedPfirmOptionSets,
      },

      'aerial-year': {
        defaultValue: 'aerials-2016',
      },

      // TODO: After merge of params refactor, update print service based on this param.
      print: { defaultValue: false },
    },
  ),
);

export default class ApplicationController extends Controller.extend(mapQueryParams.Mixin) {
  @service('print')
  printSvc;

  @service
  fastboot;

  @service
  mainMap;

  // this action extracts query-param-friendly state of layer groups
  // for various paramable layers
  @action
  handleLayerGroupChange() {
    // handle visibility state
    const visibleLayerGroups = this.model.layerGroups
      .filter(({ visible }) => visible)
      .map(({ id }) => id)
      .sort();

    this.set('layerGroups', visibleLayerGroups);
  }

  @action
  setModelsToDefault() {
    this.model.layerGroups.forEach(model => model.rollbackAttributes());
    this.handleLayerGroupChange();
  }

  @computed('queryParamsState')
  get isDefault() {
    const state = this.get('queryParamsState') || {};
    const values = Object.values(state);

    return values.isEvery('changed', false);
  }
}
