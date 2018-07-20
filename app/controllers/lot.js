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

export default Controller.extend(Bookmarkable, {

  @computed('lot.zonemap')
  paddedZonemap(zonemap) {
    return (`0${zonemap}`).slice(-3);
  },

  @computed('lot.geometry')
  parentSpecialPurposeDistricts(geometry) {
    return carto.SQL(SQL('special_purpose_districts_v201806', geometry))
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
