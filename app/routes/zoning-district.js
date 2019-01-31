import Route from '@ember/routing/route';
import { computed, action } from '@ember-decorators/object'; // eslint-disable-line
import updateSelectionZoningMixin from '../mixins/update-selection-zoning';

const mappableRoute = Route.extend(updateSelectionZoningMixin, {});

export default class ZoningDistrictRoute extends mappableRoute {
  model(params) {
    return {
      taskInstance: this.store.findRecord('zoning-district', params.zonedist),
    };
  }
}
