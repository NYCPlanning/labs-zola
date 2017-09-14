import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    return this.store.findRecord('zma', params.ulurpno);
  },

  afterModel(model) {
    const mainMap = this.get('mainMap');
    mainMap.set('selected', model);
  },
});
