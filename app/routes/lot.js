import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bblDemux from '../utils/bbl-demux';
import updateSelectionMixin from '../mixins/update-selection-lot';

export default Route.extend(updateSelectionMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return {
      taskInstance: this.store.findRecord('lot', id),
    };
  },
});
