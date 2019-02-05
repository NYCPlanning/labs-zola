import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bblDemux from '../utils/bbl-demux';
import updateSelectionSingleFeatureMixin from '../mixins/update-selection-single-feature';

export default Route.extend(updateSelectionSingleFeatureMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);

    return {
      taskInstance: this.store.findRecord('lot', id),
    };
  },
});
