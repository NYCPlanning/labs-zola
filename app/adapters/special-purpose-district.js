import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const SQL = function(id) {
  return `SELECT cartodb_id as id, the_geom, sdname, sdlbl FROM support_zoning_sp WHERE cartodb_id='${id}'`;
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
