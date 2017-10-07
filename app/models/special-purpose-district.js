import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';
import Bookmarkable from './bookmark';

export default Bookmarkable.extend({
  geometry: DS.attr(),
  sdlbl: DS.attr('string'),
  sdname: DS.attr('string'),

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
