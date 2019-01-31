import Mixin from '@ember/object/mixin';
import { task, waitForProperty } from 'ember-concurrency';
import { inject as service } from '@ember/service';

// this mixin accounts for ONE functionality that occurs on when a user either searches a tax lot or clicks on the map layer
// when a user searches a lot or clicks on the lot ont the map, the map will fit bounds to the single lot feature (e.g. Manhattan(1), Block 489, Lot 2)

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
});
