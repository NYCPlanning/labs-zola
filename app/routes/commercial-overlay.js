import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

export default Route.extend(updateSelectionMixin, {
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
