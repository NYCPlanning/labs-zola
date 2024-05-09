import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MapFeatureController extends Controller {
  @service mainMap;

  queryParams = [
    {
      search: {
        type: 'boolean',
      },
    },
    'shouldRefresh',
  ];

  shouldRefresh = false;

  @action
  clearComparison() {
    this.set('mainMap.comparisonSelected', null);
  }
}
