import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['layer-palette'],
  closed: true,
  plutoFill: false,
  actions: {
    toggleFill() {
      this.toggleProperty('plutoFill');
    },
  },
});
