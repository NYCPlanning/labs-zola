import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

export default Route.extend(updateSelectionAllFeaturesMixin, {
  // mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('special-purpose-district', params.id),
    };
  },
});
