import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (zoningMapIndexId) {
  return `SELECT the_geom,
      sectionalm as id,
      path as zoningMapURL,
      historical as historicalMapURL,
      view_updat as updateLogURL
    FROM dcp_zoning_map_index
    WHERE sectionalm='${zoningMapIndexId}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
