import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  mainMap: service(),

  actions: {
    didTransition() {
      const { mainMap } = this;
      mainMap.setProperties({
        selected: null,
        shouldFitBounds: false,
      });
      if (mainMap.mapInstance) mainMap.mapInstance.resize();
    },
  },
});
