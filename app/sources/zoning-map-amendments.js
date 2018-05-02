export default {
  id: 'zoning-map-amendments',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-map-amendments',
      sql: 'SELECT * FROM (SELECT the_geom_webmercator, to_char(effective, \'MM/DD/YYYY\') as effectiveformatted, effective, ulurpno, status, project_na FROM zoning_map_amendments_v201804 WHERE status = \'Adopted\') a',
    },
  ],
};
