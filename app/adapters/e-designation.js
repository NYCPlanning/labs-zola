import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function(bbl) {
  return `SELECT e.the_geom,
        e.cartodb_id AS id,
        e.cartodb_id,
        e.bbl,
        e.ceqr_num,
        e.enumber,
        e.ulurp_num,
        b.address
    FROM dcp_e_designations AS e, dcp_mappluto AS b
    WHERE e.bbl='${bbl}' AND b.bbl='${bbl}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(
      SQL(id),
      'json',
    );
  },
});
