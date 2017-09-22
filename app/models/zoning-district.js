import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

export default DS.Model.extend({
  geometry: DS.attr(),
  zonedist: DS.attr('string'),


  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
