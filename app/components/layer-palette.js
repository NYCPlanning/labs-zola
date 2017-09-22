import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  mainMap: service(),

  classNames: ['layer-palette'],
  closed: true,
  plutoFill: false,
  actions: {
    toggleFill() {
      this.toggleProperty('plutoFill');
    },
  },
});
