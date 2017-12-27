import Ember from 'ember';
import FuzzySet from 'npm:fuzzyset.js';
import Bookmarkable from '../mixins/bookmarkable';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const tokens =
  [
    ['manhattan', ['125th', 'battery_park', 'clinton', 'special_enhanced', 'garment_center', 'governors_island', 'hudson_river_park', 'hudson_square', 'hudson_yards', 'commercial_district', 'lincoln_square', 'little_italy', 'lower_manhattan', 'madison', 'manhattanville', 'midtown', 'mixed_use', 'park', 'planned_community', 'sri', 'transit_land_use', 'tribeca', 'union_square', 'un_development', 'west_chelsea']],
    ['bronx', ['city_island', 'grand_concourse', 'harlem_river', 'hunts_point', 'mixed_use', 'natural_area', 'planned_community']],
    ['brooklyn', ['bay_ridge', 'coney_special', 'coney_island', 'downtown_brooklyn', 'special_fourth', 'mixed_use', 'ocean_parkway', 'scenic_view', 'sheepshead_bay']],
    ['queens', ['college_point', 'far_rockaway', 'jamaica', 'forest_hills', 'long_island_city', 'mixed_use', 'natural_area', 'planned_community', 'hunters_point', 'willets_point']],
    ['staten-island', ['hillsides', 'natural_area', 'south_richmond', 'st_george', 'stapleton']],
    ['citywide', ['special_coastal_risk', 'special_enhanced', 'limited_commercial', 'mixed_use', 'natural_area', 'planned_cp', 'scenic_view']],
  ];

export default Ember.Controller.extend(Bookmarkable, {
  @computed('model.sdname')
  readMoreLink(name) {
    const strippedName = name.replace('Special ', '').replace(' District', '').replace(' Development', '');
    const strings = tokens
      .map(([, list]) => list)
      .reduce((a, b) => a.concat(b));
    const fuzzySet = FuzzySet(strings);
    const [[, bestMatch]] = fuzzySet.get(strippedName) || [[]];
    const [boro] = tokens.find(([, list]) => list.find(i => bestMatch === i)) || [];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boro}.page#${bestMatch}`;
  },
});
