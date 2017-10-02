export default {
  id: 'zoning-map-amendments',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-map-amendments',
      sql: 'SELECT * FROM (SELECT the_geom_webmercator, to_char(effective, \'MM/DD/YYYY\') as effectiveformatted, effective, ulurpno, status, project_na FROM support_nyzma WHERE status = \'Adopted\') a',
    },
  ],
};
