import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (id) {
  return `SELECT e.the_geom,
        e.cartodb_id AS id,
        e.bbl,
        e.ceqr_num,
        e.enumber,
        e.ulurp_num,
        b.address
    FROM dcp_e_designations e
    LEFT JOIN dcp_mappluto b on e.bbl = b.bbl
    WHERE e.cartodb_id=${id};`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
