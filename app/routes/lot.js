import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import bblDemux from '../utils/bbl-demux';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

// convert 'R6A' to 'r6'

const getPrimaryZone = (zonedist) => {
  let primary = zonedist.match(/\w\d*/)[0].toLowerCase();

  // special handling for c1 and c2
  if ((primary === 'c1') || (primary === 'c2')) primary = 'c1-c2';

  return primary;
};

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return {
      taskInstance: this.store.findRecord('lot', id),
    };
  },

  setupController(controller, { taskInstance }) {
    this._super(controller, taskInstance);
    this.waitToFitBounds.perform(taskInstance);

    controller
      .setProperties({
        model: taskInstance,
        @computed('model.value') lot() { return taskInstance.get('value'); },
        @computed('lot.zonedist1') primaryzone1(zonedist) { return getPrimaryZone(zonedist); },
        @computed('lot.zonedist2') primaryzone2(zonedist) { return getPrimaryZone(zonedist); },
        @computed('lot.zonedist3') primaryzone3(zonedist) { return getPrimaryZone(zonedist); },
        @computed('lot.zonedist4') primaryzone4(zonedist) { return getPrimaryZone(zonedist); },
      });
  },

  waitToFitBounds: task(function* (taskInstance) {
    yield waitForProperty(taskInstance, 'state', 'finished');

    next(() => {
      this.set('mainMap.shouldFitBounds', true);
    });
  }).restartable(),
});
