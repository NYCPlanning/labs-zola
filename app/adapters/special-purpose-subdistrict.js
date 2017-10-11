import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const SQL = function(id) {
  return `SELECT cartodb_id as id, the_geom, spname, splbl, subdist, subsub FROM support_nysp_sd WHERE cartodb_id='${id}'`;
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
