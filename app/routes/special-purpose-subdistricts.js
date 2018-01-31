import Ember from 'ember';
import updateSelectionMixin from '../mixins/update-selection';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;

export default Ember.Route.extend(updateSelectionMixin, {
  mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('special-purpose-subdistrict', params.id),
    };
  },

  setupController(controller, { taskInstance }) {
    this._super(controller, taskInstance);

    controller
      .setProperties({
        model: taskInstance,
        @computed('model.value') subdistrict() { return taskInstance.get('value'); },
      });
  },

  actions: {
    didTransition() {
      this.set('mainMap.shouldFitBounds', true);
    },
  },
});
