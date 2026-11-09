import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const SQL = function (boardOfStandardsAndAppealsId) {
  return `
    WITH selected_address AS (
      SELECT
        cartodb_id,
        the_geom,
        number,
        street,
        borough
      FROM board_of_standards_and_appeals_10302026_v1
      WHERE cartodb_id = '${boardOfStandardsAndAppealsId}'
    )

    SELECT
      selected_address.the_geom,
      selected_address.cartodb_id AS id,
      selected_address.number AS street_number,
      selected_address.street AS street_address,
      selected_address.borough,

      (
        SELECT json_agg(
          json_build_object(
            'id', bsa.cartodb_id,
            'filed', bsa.filed,
            'calendar_number', bsa.calendar_number,
            'project_description', bsa.project_description,
            'status', bsa.status,
            'decision_date', bsa.date,
            'decision_url', bsa.decisions_url
          )
          ORDER BY bsa.cartodb_id
        )
        FROM board_of_standards_and_appeals_10302026_v1 bsa
        WHERE
          bsa.number IS NOT DISTINCT FROM selected_address.number
          AND bsa.street IS NOT DISTINCT FROM selected_address.street
          AND bsa.borough IS NOT DISTINCT FROM selected_address.borough
      ) AS cases

    FROM selected_address
  `;
};

export default CartoGeojsonFeatureAdapter.extend({
  urlForFindRecord(id) {
    return buildSqlUrl(SQL(id), 'geojson');
  },
});
