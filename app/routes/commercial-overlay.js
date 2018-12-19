import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import updateSelectionMixin from '../mixins/update-selection-zoning';

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('commercial-overlay', params.id),
    };
  },

  bounds: alias('mainMap.bounds'),

  actions: {
    fitBounds() {
      const { mainMap } = this;
      const map = mainMap.mapInstance;
      const fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
      map.fitBounds(this.bounds, fitBoundsOptions);
    },
  },
});
