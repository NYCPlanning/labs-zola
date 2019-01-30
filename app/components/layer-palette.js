import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';

const aerialYears = [16, 1996, 1951, 1924];

export default class LayerPaletteComponent extends Component {
  @argument
  qps = null;

  @argument
  layerGroups;

  @argument
  resetQueryParmas;

  classNames = ['layer-palette'];

  closed = true;

  plutoFill = false;


  aerialYears = aerialYears;

  @action
  toggleFill() {
    this.toggleProperty('plutoFill');
  }

  @action
  setPaintForLayerGroup(layerGroup, ...args) {
    layerGroup.setPaintForLayer(...args);
  }

  @action
  switchAerial(year, mainToggle = false) {
    const formattedYear = `aerials-${year}`;
    const propNames = aerialYears.map(aYear => `aerials-${aYear}`);
    const { qps } = this;
    const isAnyLayerSelected = propNames.any(prop => qps.get(prop));

    // turn off all aerial layers
    propNames.forEach((aerialYear) => {
      qps.set(aerialYear, false);
    });

    // if it's the main switch and any are visible, turn them all off
    // otherwise, switch to the selected aerial
    if (!(mainToggle && isAnyLayerSelected)) {
      qps.toggleProperty(formattedYear);
    }
  }
}
