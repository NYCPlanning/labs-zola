import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

// columns requested from server
// update to add more
const LotColumnsSQL = [
  'bbl',
  'yearbuilt',
  'zonedist1',
  'zonedist2',
  'zonedist3',
  'zonedist4',
  'lotarea',
];

export default DS.Model.extend({
  geometry: DS.attr(),
  bbl: DS.attr('string'),
  yearbuilt: DS.attr('string'),
  zonedist1: DS.attr('string'),
  zonedist2: DS.attr('string'),
  zonedist3: DS.attr('string'),
  zonedist4: DS.attr('string'),
  lotarea: DS.attr('number'),

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});

export { LotColumnsSQL };
