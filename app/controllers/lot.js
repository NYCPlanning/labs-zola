import Controller from '@ember/controller';
import { computed as computedProp } from '@ember/object';
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
  paddedZonemap: computedProp('model.value.zonemap', function () {
    const zonemap = this.get('model.value.zonemap');
    return (`0${zonemap}`).slice(-3);
  }),

  primaryzone1: computedProp('model.value.zonedist1', function () {
    const zonedist = this.get('model.value.zonedist1');
    return getPrimaryZone(zonedist);
  }),

  primaryzone2: computedProp('model.value.zonedist2', function () {
    const zonedist = this.get('model.value.zonedist2');
    return getPrimaryZone(zonedist);
  }),

  primaryzone3: computedProp('model.value.zonedist3', function () {
    const zonedist = this.get('model.value.zonedist3');
    return getPrimaryZone(zonedist);
  }),

  primaryzone4: computedProp('model.value.zonedist4', function () {
    const zonedist = this.get('model.value.zonedist4');
    return getPrimaryZone(zonedist);
  }),

  parentSpecialPurposeDistricts: computedProp('model.value.geometry', function() {
    const geometry = this.get('model.value.geometry');

    return carto.SQL(SQL('special_purpose_districts_v20181206', geometry))
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
  }),
});
