import Route from '@ember/routing/route';
import { computed, action } from '@ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

const mappableRoute = Route.extend(updateSelectionMixin, {});

export default class ZoningDistrictRoute extends mappableRoute {
  model(params) {
    return {
      taskInstance: this.store.findRecord('zoning-district', params.zonedist),
    };
  }

  @action
  fitBounds() {
    const { mainMap } = this;
    const map = mainMap.mapInstance;
    const fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
    map.fitBounds(this.mainMap.bounds, fitBoundsOptions);
  }
}
