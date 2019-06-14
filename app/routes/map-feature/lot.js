import Route from '@ember/routing/route';
import bblDemux from 'labs-zola/utils/bbl-demux';
import updateSelectionSingleFeatureMixin from 'labs-zola/mixins/update-selection-single-feature';

const GeometricRoute = Route.extend(updateSelectionSingleFeatureMixin);

export default class MapFeatureLotRoute extends GeometricRoute {
  model(params) {
    const id = bblDemux(params);

    return {
      id,
    };
  }
}
