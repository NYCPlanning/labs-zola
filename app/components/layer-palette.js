import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { next } from '@ember/runloop';
import config from 'labs-zola/config/environment';
import { tracked } from '@glimmer/tracking';

const {
  zoningDistrictOptionSets,
  commercialOverlaysOptionSets,
  floodplainEfirm2007OptionSets,
  floodplainPfirm2015OptionSets,
  cityCouncilDistrictsOptionSets,
} = config;

@classNames('layer-palette')
export default class LayerPaletteComponent extends Component {
  @service metrics;

  @service fastboot;

  @tracked
  showZFALayer = config.featureFlagShowZFALayer;

  init(...args) {
    super.init(...args);

    this.setFilterForZoning();
    this.setFilterForOverlays();
    this.setFilterForFirm();
    this.setFilterForPfirm();
    this.setFilterForCouncilDistricts();
  }

  @service mainMap;

  zoomWarningLabel = 'Some information may not be visible at this zoom level.';

  selectedZoning = [];

  selectedOverlays = [];

  selectedFirm = [];

  selectedPfirm = [];

  selectedCouncilDistricts = [];

  selectedLayerGroup = [];

  zoningDistrictOptionSets = zoningDistrictOptionSets;

  commercialOverlaysOptionSets = commercialOverlaysOptionSets;

  firmOptionSets = floodplainEfirm2007OptionSets;

  pfirmOptionSets = floodplainPfirm2015OptionSets;

  cityCouncilDistrictsOptionSets = cityCouncilDistrictsOptionSets;

  layerGroups;

  closed = true;

  cityCouncilToggled = false;

  plutoFill = false;

  resetQueryParams = () => {};

  handleLayerGroupChange = () => {};

  toggled = () => {
    this.cityCouncilToggled = !this.cityCouncilToggled;
  };

  @action
  setFilterForZoning() {
    const expression = [
      'any',
      ...this.selectedZoning.map((value) => ['==', 'primaryzone', value]),
    ];

    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['zoning-districts'].setFilterForLayer(
          'zd-fill',
          expression
        );
      });
    }
  }

  @action
  setFilterForOverlays() {
    const expression = [
      'any',
      ...this.selectedOverlays.map((value) => ['==', 'overlay', value]),
    ];
    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['commercial-overlays'].setFilterForLayer(
          'co',
          expression
        );
        this.layerGroups['commercial-overlays'].setFilterForLayer(
          'co_labels',
          expression
        );
      });
    }
  }

  @action
  setFilterForCouncilDistricts() {
    const expression = [
      'any',
      ...this.selectedCouncilDistricts.map((value) => ['==', 'year', value]),
    ];

    this.toggled();
    // // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['nyc-council-districts-combined'].setFilterForLayer(
          'dcp_city_council_districts_combined-line-glow',
          expression
        );
        this.layerGroups['nyc-council-districts-combined'].setFilterForLayer(
          'dcp_city_council_districts_combined-line',
          expression
        );
        this.layerGroups['nyc-council-districts-combined'].setFilterForLayer(
          'dcp_city_council_districts_combined-label',
          expression
        );
      });
    }
  }

  @action
  setFilterForFirm() {
    const expression = [
      'any',
      ...this.selectedFirm.map((value) => ['==', 'fld_zone', value]),
    ];

    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['floodplain-efirm2007'].setFilterForLayer(
          'effective-flood-insurance-rate-2007',
          expression
        );
      });
    }
  }

  @action
  setFilterForPfirm() {
    const expression = [
      'any',
      ...this.selectedPfirm.map((value) => ['==', 'fld_zone', value]),
    ];

    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['floodplain-pfirm2015'].setFilterForLayer(
          'preliminary-flood-insurance-rate',
          expression
        );
      });
    }
  }

  @action
  setSelectionForAerials(id) {
    this.layerGroups.aerials.set('selected', id);

    this.handleLayerGroupChange();
  }

  @action
  setPaintForLayerGroup(layerGroup, ...args) {
    layerGroup.setPaintForLayer(...args);
  }

  @action
  handleLayerGroupToggle(layerGroup) {
    gtag('event', 'toggle_layer', {
      event_category: 'Layers',
      event_action: `${layerGroup.visible ? 'Turned on' : 'Turned off'} ${
        layerGroup.legend.label
      }`,
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Layers',
      action: `${layerGroup.visible ? 'Turned on' : 'Turned off'} ${
        layerGroup.legend.label
      }`,
      name: `${layerGroup.legend.label}`,
    });
    this.handleLayerGroupChange();
  }
}
