import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function(ulurpno) {
  return `SELECT the_geom,
      ulurpno,
      ulurpno as id,
      project_na,
      effective,
      status,
      lucats
    FROM dcp_zoning_map_amendments
    WHERE ulurpno='${ulurpno}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(
      SQL(id),
      'geojson',
    );
  },
});
