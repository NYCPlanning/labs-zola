export default {
  id: 'zoning-map-amendments',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-map-amendments',
      sql: 'SELECT * FROM (SELECT the_geom_webmercator, to_char(effective, \'MM/DD/YYYY\') as effectiveformatted, effective, ulurpno, status, project_na FROM zoning_map_amendments WHERE status = \'Adopted\') a',
    },
  ],
};
