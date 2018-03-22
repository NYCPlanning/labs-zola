import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';

export default Mixin.create({
  afterModel({ taskInstance }) {
    this.get('setSelectedTask').perform(taskInstance);
  },

  setSelectedTask: task(function* (taskInstance) {
    const model = yield taskInstance;
    this.set('mainMap.selected', model);
  }).restartable().cancelOn('deactivate'),
});
