import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const SQL = function(ulurpno) {
  return `SELECT the_geom, ulurpno as id FROM support_nyzma WHERE ulurpno='${ulurpno}'`;
};

export default DS.JSONAPIAdapter.extend({
  keyForAttribute(key) {
    return key;
  },
  urlForFindRecord(ulurpno) {
    return buildSqlUrl(
      SQL(ulurpno),
      'geojson',
    );
  },
});
