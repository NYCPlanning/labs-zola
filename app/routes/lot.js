import Ember from 'ember';
import { task } from 'ember-concurrency';
import bblDemux from '../utils/bbl-demux';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return {
      taskInstance: this.get('findLotTask').perform(id),
    };
  },

  findLotTask: task(function* (id) {
    const record = yield this.store.findRecord('lot', id);
    this.set('mainMap.selected', record);
    return record;
  }).restartable().cancelOn('deactivate'),

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },
});
