export default {
  id: 'pluto',
  type: 'cartovector',
  minzoom: 12,
  'source-layers': [
    {
      id: 'pluto',
      sql: 'SELECT the_geom_webmercator, bbl, lot, landuse, address FROM mappluto_v1711',
    },
  ],
};
