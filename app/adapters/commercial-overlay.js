import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

// const SQL = function(id) {
//   return `SELECT *, overlay as id FROM commercial_overlays_v201804 WHERE overlay='${id}'`;
// };

const SQL = function(id) {
  return `SELECT * FROM (
    SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, overlay as id, overlay FROM commercial_overlays_v201804 GROUP BY overlay
  ) a WHERE id='${id}'`;
};

export default DS.JSONAPIAdapter.extend({
  keyForAttribute(key) {
    return key;
  },
  urlForFindRecord(id) {
    return buildSqlUrl(
      SQL(id),
      'geojson',
    );
  },
});
