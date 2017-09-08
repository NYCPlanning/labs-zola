import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';
import { LotColumnsSQL } from '../models/lot';

const SQL = function(id) {
  return `SELECT ${LotColumnsSQL.join(',')}, the_geom, bbl AS id FROM support_mappluto WHERE bbl=${id}`;
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
