import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['layer-palette'],
  closed: true,
  plutoFill: true,
  c11: true,
  c12: true,
  c13: true,
  c14: true,
  c15: true,
  c21: true,
  c22: true,
  c23: true,
  c24: true,
  c25: true,
  actions: {
    toggleFill() {
      this.toggleProperty('plutoFill');
    },
  },
});
