import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

export default Route.extend(updateSelectionAllFeaturesMixin, {
  model(params) {
    return {
      taskInstance: this.store.findRecord('special-purpose-subdistrict', params.id),
    };
  },
});
