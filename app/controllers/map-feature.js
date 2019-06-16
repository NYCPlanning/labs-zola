import Controller from '@ember/controller';

export default class MapFeatureController extends Controller {
  queryParams = [{
    search: {
      type: 'boolean',
    },
  }];
}
