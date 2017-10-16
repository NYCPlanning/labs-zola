export default {
  id: 'transportation',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'subway-routes',
      sql: 'SELECT the_geom_webmercator, rt_symbol FROM support_trans_mta_subway_routes',
    },
    {
      id: 'subway-stops',
      sql: 'SELECT the_geom_webmercator, name FROM support_trans_mta_subway_stops',
    },
    {
      id: 'subway-entrances',
      sql: 'SELECT the_geom_webmercator FROM support_trans_mta_subway_entrances',
    },
  ],
};
