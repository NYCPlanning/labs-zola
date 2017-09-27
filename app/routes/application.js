import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),
  afterModel() {
    this.get('mainMap').resetBounds();
  },
});
