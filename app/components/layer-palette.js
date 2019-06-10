import Component from '@ember/component';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { next } from '@ember/runloop';

export const zoningDistrictGroups = [
  {
    name: 'Commercial Districts',
    checked: true,
    codes: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    style: {
      color: 'rgbA(229,0,0,0.6)',
    },
  },
  {
    name: 'Manufacturing Districts',
    checked: true,
    codes: ['M1', 'M2', 'M3'],
    style: {
      color: 'rgba(207,92,230,0.6)',
    },
  },
  {
    name: 'Residential Districts',
    checked: true,
    codes: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
    style: {
      color: 'rgba(255,234,0,0.6)',
    },
  },
  {
    name: 'Parks',
    checked: true,
    codes: ['PA'],
    style: {
      color: 'rgba(120,210,113,0.6)',
    },
  },
  {
    name: 'Battery Park City',
    checked: true,
    codes: ['BP'],
    style: {
      color: 'rgba(128,128,128,0.6)',
    },
  },
];

export const commercialOverlays = [
  {
    name: 'C1-1 through C1-5',
    checked: true,
    codes: ['C1-1', 'C1-2', 'C1-3', 'C1-4', 'C1-5'],
  },
  {
    name: 'C2-1 through C2-5',
    checked: true,
    codes: ['C2-1', 'C2-2', 'C2-3', 'C2-4', 'C2-5'],
  },
];

@classNames('layer-palette')
export default class LayerPaletteComponent extends Component {
  init(...args) {
    super.init(...args);

    this.setFilterForZoning();
    this.setFilterForOverlays();
  }

  selectedZoning = [];

  selectedOverlays = [];

  zoningDistrictGroups = zoningDistrictGroups;

  commercialOverlays = commercialOverlays;

  layerGroups;

  closed = true;

  plutoFill = false;

  @observes('selectedZoning.@each')
  setFilterForZoning() {
    const expression = ['any', ...this.selectedZoning.map(value => ['==', 'primaryzone', value])];

    next(() => {
      this.layerGroups['zoning-districts'].setFilterForLayer('zd-fill', expression);
    });
  }

  @observes('selectedOverlays.@each')
  setFilterForOverlays() {
    const expression = ['any', ...this.selectedOverlays.map(value => ['==', 'overlay', value])];

    next(() => {
      this.layerGroups['commercial-overlays'].setFilterForLayer('co', expression);
      this.layerGroups['commercial-overlays'].setFilterForLayer('co_labels', expression);
    });
  }

  @action
  setPaintForLayerGroup(layerGroup, ...args) {
    layerGroup.setPaintForLayer(...args);
  }
}
