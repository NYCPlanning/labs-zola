import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember-decorators/object'; // eslint-disable-line

export default class ZoningDistrictRoute extends Route {
  mainMap = service();

  model(params) {
    return this.store.findRecord('zoning-district', params.zonedist);
  }

  afterModel(model) {
    this.set('mainMap.selected', model);
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
