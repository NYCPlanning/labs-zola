import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),

  model(params) {
    return {
      taskInstance: this.store.findRecord('zma', params.ulurpno),
    };
  },

  setupController(controller, { taskInstance }) {
    this._super(controller, taskInstance);

    controller
      .setProperties({
        model: taskInstance,
        @computed('model.value') zma() { return taskInstance.get('value'); },
      });
  },

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },
});
