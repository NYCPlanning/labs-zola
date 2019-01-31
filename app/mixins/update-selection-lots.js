import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Mixin.create({
  mainMap: service(),
  afterModel({ taskInstance }, transition) {
    if (transition.queryParams.search === 'true') {
      this.waitToFitBounds.perform(taskInstance);
    }
  },
  setupController(controller, { taskInstance }) {
    this.setSelectedTask.perform(taskInstance);
    this._super(controller, taskInstance);
  },

  setSelectedTask: task(function* (taskInstance) {
    const model = yield taskInstance;
    this.set('mainMap.selected', model);
  }).restartable().cancelOn('deactivate'),

  waitToFitBounds: task(function* (taskInstance) {
    const model = yield taskInstance;

    this.set('mainMap.selected', model);
    this.get('mainMap.setBounds').perform();
  }).restartable().cancelOn('deactivate'),

  actions: {
    fitBounds() {
      this.get('mainMap.setBounds').perform();
    },
  },
});
