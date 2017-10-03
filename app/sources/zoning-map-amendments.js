export default {
  id: 'zoning-map-amendments',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-map-amendments',
      sql: 'SELECT the_geom_webmercator, ulurpno, status, project_na FROM support_nyzma',
    },
  ],
};
