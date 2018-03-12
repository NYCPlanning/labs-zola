import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Route.extend(updateSelectionMixin, {
  mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('commercial-overlay', params.id),
    };
  },

  bounds: alias('mainMap.bounds'),

  setupController(controller, { taskInstance }) {
    this._super(controller, taskInstance);

    controller
      .setProperties({
        model: taskInstance,
        @computed('model.value') overlay() { return taskInstance.get('value'); },
      });
  },

  actions: {
    fitBounds() {
      const mainMap = this.get('mainMap');
      const map = mainMap.mapInstance;
      const fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
      map.fitBounds(this.get('bounds'), fitBoundsOptions);
    },
  },
});
