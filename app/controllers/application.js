import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import QueryParams from '@nycplanning/ember-parachute';
import config from 'labs-zola/config/environment';
import { tracked } from '@glimmer/tracking';

const {
  defaultLayerGroupState,
  zoningDistrictOptionSets,
  commercialOverlaysOptionSets,
  floodplainEfirm2007OptionSets,
  floodplainPfirm2015OptionSets,
} = config;

const defaultLayerGroups = defaultLayerGroupState
  .filter((layerGroup) => layerGroup.visible)
  .map((layerGroup) => layerGroup.id)
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

const defaultSelectedCouncilDistricts = ['2013'];

// define new query params here:
export const mapQueryParams = new QueryParams(
  assign({
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
      defaultValue: 'aerials-2022',
    },

    // TODO: After merge of params refactor, update print service based on this param.
    print: { defaultValue: false },
  })
);

export default class ApplicationController extends Controller.extend(
  mapQueryParams.Mixin
) {
  @service('print') printSvc;

  @service fastboot;

  @service mainMap;

  @service metrics;

  @tracked leftSideMenuVisibilty = true;
  @tracked layerGroupsStorage;

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
    this.set('layerGroupsStorage', null);
  }

  @action
  setModelsToDefault() {
    this.model.layerGroups.forEach((model) => model.rollbackAttributes());
    this.handleLayerGroupChange();
  }

  @action
  setAllLayerVisibilityToFalse() {
    // save them so we can be able to reset them
    const tempStorage = this.model.layerGroups
      .filter(({ visible }) => visible)
      .map(({ id }) => id)
      .sort();

    this.model.layerGroups
      .filter(({ visible }) => visible)
      .forEach((model) => this.toggleLayerVisibilityToFalse(model));
    this.handleLayerGroupChange();

    this.set('layerGroupsStorage', tempStorage);

    gtag('event', 'search', {
      event_category: 'Toggle Layer',
      event_action: 'Toggle All Layers Off',
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Toggle Layer',
      action: 'Toggle All Layers Off',
      name: 'Toggle All Layers Off',
    });
  }

  @action
  undoSetAllLayerVisibilityToFalse() {
    this.model.layerGroups.forEach((lg) => {
      if (this.layerGroupsStorage.includes(lg.id)) {
        lg.set('visible', true);
      }
    });

    this.set('layerGroupsStorage', null);
    this.handleLayerGroupChange();

    gtag('event', 'search', {
      event_category: 'Toggle Layer',
      event_action: 'Undo Toggle All Layers Off',
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Toggle Layer',
      action: 'Undo Toggle All Layers Off',
      name: 'Undo Toggle All Layers Off',
    });
  }

  @action
  toggleLayerVisibilityToFalse(layer) {
    layer.visible = false;
  }

  @computed('layerGroupsStorage', 'model.layerGroups')
  get showToggleLayersBackOn() {
    if (
      this.model.layerGroups.filter(({ visible }) => visible).length === 0 &&
      this.layerGroupsStorage
    ) {
      return true;
    }
    return false;
  }

  @computed('queryParamsState')
  get isDefault() {
    const state = this.queryParamsState || {};
    const values = Object.values(state);
    return values.every(({ changed }) => changed === false);
  }

  @action
  toggleLeftSideMenuVisibility() {
    this.leftSideMenuVisibilty = !this.leftSideMenuVisibilty;

    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Toggled Layer Menu Visibility',
      action: 'Toggled Layer Menu Visibility',
      name: `${this.leftSideMenuVisibilty ? 'Opened' : 'Closed'}`,
    });

    gtag('event', 'toggle_menu', {
      event_category: 'Toggled Layer Menu Visibility',
      event_action: `${this.leftSideMenuVisibilty ? 'Opened' : 'Closed'}`,
    });
  }
}
