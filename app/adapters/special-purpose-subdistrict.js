import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const SQL = function(id) {
  return `SELECT cartodb_id as id, cartodb_id, the_geom, spname, splbl, subdist, subsub FROM special_purpose_subdistricts WHERE cartodb_id='${id}'`;
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
