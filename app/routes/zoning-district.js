import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin, {});

export default class ZoningDistrictRoute extends mappableRoute {
  model(params) {
    return {
      taskInstance: this.store.findRecord('zoning-district', params.zonedist),
    };
  }
}
