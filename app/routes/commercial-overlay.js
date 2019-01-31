import Route from '@ember/routing/route';
// import { alias } from '@ember/object/computed';
// import { inject as service } from '@ember/service';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin, {});

export default class CommercialOverlayRoute extends mappableRoute {
  model(params) {
    return {
      taskInstance: this.store.findRecord('commercial-overlay', params.id),
    };
  }
}
