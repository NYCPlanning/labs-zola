import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import updateSelectionMixin from '../mixins/update-selection';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('special-purpose-district', params.id),
    };
  },

  setupController(controller, { taskInstance }) {
    this._super(controller, taskInstance);
    controller.setProperties({
      model: taskInstance,
      @computed('model.value') district() { return taskInstance.get('value'); },
    });
  },

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },
});
