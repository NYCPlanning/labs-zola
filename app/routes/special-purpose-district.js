import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import updateSelectionMixin from '../mixins/update-selection';

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),
  model(params) {
    return {
      taskInstance: this.store.findRecord('special-purpose-district', params.id),
    };
  },
});
