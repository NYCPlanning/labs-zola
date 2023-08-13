import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (id) {
  return `SELECT * FROM (
    SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom,
      overlay as id,
      overlay
    FROM dcp_commercial_overlays
    GROUP BY overlay
  ) a WHERE id='${id}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
