export default {
  id: 'pluto',
  type: 'cartovector',
  minzoom: 12,
  'source-layers': [
    {
      id: 'pluto',
      sql: 'SELECT the_geom_webmercator, bbl, landuse, address FROM support_mappluto',
    },
  ],
};
