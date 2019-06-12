import Route from '@ember/routing/route';
import bblDemux from 'labs-zola/utils/bbl-demux';

export default class MapFeatureLotRoute extends Route {
  model(params) {
    const id = bblDemux(params);

    return {
      id,
    };
  }
}
