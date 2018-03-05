export default {
  id: 'transportation',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'subway-routes',
      sql: 'SELECT the_geom_webmercator, rt_symbol FROM mta_subway_routes_v0',
    },
    {
      id: 'subway-stops',
      sql: 'SELECT the_geom_webmercator, name FROM mta_subway_stops_v0',
    },
    {
      id: 'subway-entrances',
      sql: 'SELECT the_geom_webmercator FROM mta_subway_entrances_v0',
    },
  ],
};
