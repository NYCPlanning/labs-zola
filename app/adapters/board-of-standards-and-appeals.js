import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (boardOfStandardsAndAppealsId) {
  return `SELECT \
        the_geom,
        cartodb_id AS id,
        filed,
        calendar_number,
        project_description,
        status,
        date AS decision_date,
        decisions_url AS decision_url,
        number AS street_number,
        street AS street_address,
        borough
    FROM board_of_standards_and_appeals_10302026_v1
    WHERE cartodb_id = '${boardOfStandardsAndAppealsId}'`;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
