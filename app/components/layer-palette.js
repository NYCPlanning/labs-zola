import Component from '@ember/component';

const aerialYears = [16, 1996, 1951, 1924];

export default Component.extend({
  classNames: ['layer-palette hide-for-print'],
  closed: true,
  plutoFill: false,

  // required
  qps: null,
  aerialYears,

  actions: {
    toggleFill() {
      this.toggleProperty('plutoFill');
    },
    switchAerial(year, mainToggle = false) {
      const formattedYear = `aerials-${year}`;
      const propNames = aerialYears.map(aYear => `aerials-${aYear}`);
      const qps = this.get('qps');
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
    },
  },
});
