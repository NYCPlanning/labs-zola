import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

export default DS.Model.extend({
  geometry: DS.attr(),

  @computed('id')
  primaryzone(id) {
    const primary = id.match(/\w\d*/)[0].toLowerCase();
    return primary;
  },

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
