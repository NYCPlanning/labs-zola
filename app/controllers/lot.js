import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import Bookmarkable from '../mixins/bookmarkable';
import carto from '../utils/carto';

import specialPurposeCrosswalk from '../utils/special-purpose-crosswalk';

const SQL = function(table, geometry) {
  return `SELECT * FROM ${table}
          WHERE
            ST_Intersects(
              ST_SetSRID(
                ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326),
                ${table}.the_geom);`;
};

const getPrimaryZone = (zonedist) => {
  let primary = zonedist.match(/\w\d*/)[0].toLowerCase();
  // special handling for c1 and c2
  if ((primary === 'c1') || (primary === 'c2')) primary = 'c1-c2';
  return primary;
};

export default Controller.extend(Bookmarkable, {

  @computed('model.value.zonemap')
  paddedZonemap(zonemap) {
    return (`0${zonemap}`).slice(-3);
  },

  @computed('model.value.zonedist1')
  primaryzone1(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('model.value.zonedist2')
  primaryzone2(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('model.value.zonedist3')
  primaryzone3(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('model.value.zonedist4')
  primaryzone4(zonedist) {
    return getPrimaryZone(zonedist);
  },


  @computed('model.value.geometry')
  parentSpecialPurposeDistricts(geometry) {
    return carto.SQL(SQL('special_purpose_districts_v201810', geometry))
      .then(response => response.map(
        (item) => {
          const [, [anchorName, boroName]] = specialPurposeCrosswalk
            .find(([dist]) => dist === item.sdname);

          return {
            id: item.cartodb_id,
            label: item.sdlbl.toUpperCase(),
            name: item.sdname,
            anchorName,
            boroName,
          };
        },
      ));
  },

});
