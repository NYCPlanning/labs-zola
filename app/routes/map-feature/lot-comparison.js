import Route from '@ember/routing/route';
import bblDemux, { comparisonBblDemux } from 'labs-zola/utils/bbl-demux';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MapFeatureLotComparisonRoute extends Route {
  @service router;

  model(params) {
    const id = bblDemux(params);
    const comparisonid = comparisonBblDemux(params);

    return {
      id,
      comparisonid,
    };
  }

  @action
  cancelLotComparison(id) {
    const { boro, block, lot } = bblDemux(id);
    this.router.transitionTo('map-feature.lot', boro, block, lot);
  }
}
