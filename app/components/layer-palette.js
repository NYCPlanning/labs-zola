import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['layer-palette hide-for-print'],
  closed: true,
  plutoFill: false,
  actions: {
    toggleFill() {
      this.toggleProperty('plutoFill');
    },
  },
});
