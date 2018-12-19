import Mixin from '@ember/object/mixin';
import { task, waitForProperty } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Mixin.create({
  mainMap: service(),
  afterModel({ taskInstance }) {
    this.setSelectedTask.perform(taskInstance);
  },

  setupController(controller, { taskInstance }) {
    this.waitToFitBounds.perform(taskInstance);
    this._super(controller, taskInstance);
  },

  setSelectedTask: task(function* (taskInstance) {
    const model = yield taskInstance;
    this.set('mainMap.selected', model);
  }).restartable().cancelOn('deactivate'),

  waitToFitBounds: task(function* (taskInstance) {
    yield waitForProperty(taskInstance, 'state', 'finished');

    this.get('mainMap.setBounds').perform();
  }).restartable(),

  actions: {
    didTransition() {
      this.get('mainMap.setBounds').perform();
    },
  },
});
