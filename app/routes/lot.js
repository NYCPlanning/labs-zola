import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bblDemux from '../utils/bbl-demux';
import updateSelectionLotMixin from '../mixins/update-selection-lot';

export default Route.extend(updateSelectionLotMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);
    return {
      taskInstance: this.store.findRecord('lot', id),
    };
  },
});
