import Mixin from '@ember/object/mixin';
import { computed as computedProp } from '@ember/object';
import bbox from '@turf/bbox';
import DS from 'ember-data';

export default Mixin.create({
  geometry: DS.attr(),
  bounds: computedProp('geometry', function() {
    const geometry = this.get('geometry');

    return bbox(geometry);
  }),
});
