import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import bblDemux from '../utils/bbl-demux';
import updateSelectionSingleFeatureMixin from '../mixins/update-selection-single-feature';

export default Route.extend(updateSelectionSingleFeatureMixin, {
  mainMap: service(),

  model(params) {
    const id = bblDemux(params);

    return {
      taskInstance: this.retryableFindLot.perform(id),
    };
  },

  retryableFindLot: task(function* (id) {
    try {
      return yield this.store.findRecord('lot', id);
    } catch (e) {
      if (e.errors[0] === 'query_timeout_exceeded') {
        yield this.retryableFindLot.perform(id);
      }
    }

    return null;
  }),
});
