import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const SQL = function(id) {
  return `SELECT the_geom, ulurpno as id, project_na, effective, status, lucats FROM zoning_map_amendments WHERE id='${id}'`;
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
