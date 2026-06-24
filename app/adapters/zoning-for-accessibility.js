import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (zoningForAccessibilityId) {
  return `SELECT
    the_geom,
    cartodb_id AS id
    FROM mta_nyc_rail_station_buffer_dissolve
    WHERE cartodb_id = '${zoningForAccessibilityId}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
