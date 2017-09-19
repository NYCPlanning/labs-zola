import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  activate() {
    Ember.$('body').toggleClass('content-is-closed');
  },

  deactivate() {
    Ember.$('body').toggleClass('content-is-closed');
  },

  afterModel() {
    this.get('mainMap').resetBounds();
  },
});
