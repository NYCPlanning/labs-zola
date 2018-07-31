import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';
import { next } from '@ember/runloop';
import bblDemux from '../utils/bbl-demux';
import updateSelectionMixin from '../mixins/update-selection';

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return {
      taskInstance: this.store.findRecord('lot', id),
    };
  },

  setupController(controller, { taskInstance }) {
    this.waitToFitBounds.perform(taskInstance);
    this._super(controller, taskInstance);
  },

  waitToFitBounds: task(function* (taskInstance) {
    yield waitForProperty(taskInstance, 'state', 'finished');

    next(() => {
      this.set('mainMap.shouldFitBounds', true);
    });
  }).restartable(),
});
