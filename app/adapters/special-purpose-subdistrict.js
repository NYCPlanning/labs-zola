import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function(id) {
    return `SELECT
      cartodb_id as id,
      cartodb_id,
      the_geom,
      spname,
      splbl,
      subdist,
      subsub
    FROM dcp_special_purpose_subdistricts
    WHERE cartodb_id='${id}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
    urlForFindRecord(id) {
        return buildSqlUrl(
            SQL(id),
            'geojson',
        );
    },
});