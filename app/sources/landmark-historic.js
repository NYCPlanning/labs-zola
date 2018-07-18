export default {
  id: 'landmark-historic',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'historic-districts',
      sql: 'SELECT the_geom_webmercator, area_name FROM historic_districts_lpc_v20180501 WHERE status_of = \'DESIGNATED\'',
    },
    {
      id: 'landmarks',
      sql: 'SELECT the_geom_webmercator, lm_name, lm_type FROM individual_landmarks_lpc_v20180501 WHERE (lm_type = \'Individual Landmark\' OR lm_type = \'Interior Landmark\') AND last_actio = \'DESIGNATED\'',
    },
    {
      id: 'scenic-landmarks',
      sql: 'SELECT the_geom_webmercator, scen_lm_na FROM scenic_landmarks_lpc_v20180501 WHERE last_actio = \'DESIGNATED\'',
    },
  ],
};
