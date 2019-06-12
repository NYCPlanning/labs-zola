import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

// this mixin accounts for ONE functionality that occurs when a user either searches a tax lot or clicks on the map layer
// when a user searches a lot or clicks on the lot on the map, the map will fit bounds to the single lot feature (e.g. Manhattan(1), Block 489, Lot 2)

export default Mixin.create({
  mainMap: service(),
  afterModel({ taskInstance }) {
    this.setSelectedTask.perform(taskInstance);
  },

  setupController(controller, model) {
    this.waitToFitBounds.perform(model.taskInstance);

    this._super(controller, model);
  },

  setSelectedTask: task(function* (taskInstance) {
    const model = yield taskInstance;
    this.set('mainMap.selected', model);
  }).restartable().cancelOn('deactivate'),

  // waiting for information it doesn't yet have
  waitToFitBounds: task(function* (taskInstance) {
    yield taskInstance;
    yield this.setSelectedTask;

    this.get('mainMap.setBounds').perform();
  }).restartable(),
});
