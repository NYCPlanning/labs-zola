import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { next } from '@ember/runloop';
import config from 'labs-zola/config/environment';

const { zoningDistrictOptionSets, commercialOverlaysOptionSets } = config;

const firmOverlaysOptionSets = [
  {
    name: 'V',
    checked: true,
    codes: ['V'],
    style: {
      color: '#0084a8',
    },
  },
  {
    name: 'A',
    checked: true,
    codes: ['A'],
    style: {
      color: '#00a9e6',
    },
  },
  {
    name: 'Shaded X',
    checked: true,
    codes: ['Shaded X'],
    style: {
      color: '#00ffc3',
    },
  },
];

@classNames('layer-palette')
export default class LayerPaletteComponent extends Component {
  @service
  metrics;

  @service
  fastboot;

  init(...args) {
    super.init(...args);

    this.setFilterForZoning();
    this.setFilterForOverlays();
  }

  @service
  mainMap

  zoomWarningLabel = 'Some information may not be visible at this zoom level.';

  selectedZoning = [];

  selectedOverlays = [];

  zoningDistrictOptionSets = zoningDistrictOptionSets;

  commercialOverlaysOptionSets = commercialOverlaysOptionSets;


  firmOverlaysOptionSets = firmOverlaysOptionSets

  pfirmOverlaysOptionSets = firmOverlaysOptionSets;

  layerGroups;

  closed = true;

  plutoFill = false;

  resetQueryParams = () => {};

  handleLayerGroupChange = () => {};

  @action
  setFilterForZoning() {
    const expression = [
      'any',
      ...this.selectedZoning.map(value => ['==', 'primaryzone', value]),
    ];

    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['zoning-districts'].setFilterForLayer('zd-fill', expression);
      });
    }
  }

  @action
  setFilterForOverlays() {
    const expression = [
      'any',
      ...this.selectedOverlays.map(value => ['==', 'overlay', value]),
    ];

    // if-guard to prevent the node-based fastboot server from running this
    // mapbox-gl method which gets ignored in fastboot.
    if (!this.fastboot.isFastBoot) {
      next(() => {
        this.layerGroups['commercial-overlays'].setFilterForLayer('co', expression);
        this.layerGroups['commercial-overlays'].setFilterForLayer('co_labels', expression);
        this.layerGroups['floodplain-efirm2007'].setFilterForLayer('effective-flood-insurance-rate-2007', expression);
        this.layerGroups['floodplain-pfirm2015'].setFilterForLayer('preliminary-flood-insurance-rate', expression);
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
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Layers',
      eventAction: `${layerGroup.visible ? 'Turned on' : 'Turned off'} ${layerGroup.legend.label}`,
    });

    this.handleLayerGroupChange();
  }
}
