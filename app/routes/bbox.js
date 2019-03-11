import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bboxPolygon from '@turf/bbox-polygon';
import booleanWithin from '@turf/boolean-within';

export const GREATER_NYC_BBOX = [-74.492798, 40.435450, -73.413391, 41.028607];

export default Route.extend({
  mainMap: service(),

  model(params) {
    const {
      west,
      south,
      east,
      north,
    } = params;

    if (!this.validateBounds([west, south, east, north])) {
      this.transitionTo('/');
    }

    return [west, south, east, north];
  },

  afterModel(bounds) {
    this.get('mainMap.setBounds').perform(bounds);
  },

  validateBounds(bounds) {
    if (bounds.filter(d => isNaN(d)).length) return false; // eslint-disable-line

    return booleanWithin(bboxPolygon(bounds), bboxPolygon(GREATER_NYC_BBOX));
  },
});
