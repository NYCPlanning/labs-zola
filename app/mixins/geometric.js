import Mixin from '@ember/object/mixin';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';
import DS from 'ember-data';

export default Mixin.create({
  geometry: DS.attr(),

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
