import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { computed, action } from '@ember-decorators/object'; // eslint-disable-line
import updateSelectionMixin from '../mixins/update-selection';

const mappableRoute = Route.extend(updateSelectionMixin, {});

export default class ZoningDistrictRoute extends mappableRoute {
  model(params) {
    return {
      taskInstance: this.store.findRecord('zoning-district', params.zonedist),
    };
  }

  bounds = alias('mainMap.bounds');

  @action
  fitBounds() {
    const { mainMap } = this;
    const map = mainMap.mapInstance;
    const fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
    map.fitBounds(this.bounds, fitBoundsOptions);
  }
}
