import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

// this mixin accounts for TWO different functionalities based on whether a user searches or clicks on a:
// zoning district, special purpose district, special purpose subdistrict, or zoning map amendment (zma)
// this is done through setting query params for search: true (search for layer) and search: false (click on layer)
// when a user searches a district, the map will fit bounds to ALL of the features that correspond to that district (e.g. R6A)
// when a user clicks on a district, the color of the polygon(s) will be changed but the map will not fit bounds

export default Mixin.create({
  mainMap: service(),
  afterModel({ taskInstance }, transition) {
    if (transition.queryParams && transition.queryParams.search === 'true') {
      this.waitToFitBounds.perform(taskInstance);
    }
  },
  setupController(controller, hash) {
    this.setSelectedTask.perform(hash.taskInstance);
    this._super(controller, hash);
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
