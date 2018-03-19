export default {
  id: 'landmark-historic',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'historic-districts',
      sql: 'SELECT the_geom_webmercator, area_name FROM historic_districts_v201711 WHERE status_of_ = \'DESIGNATED\'',
    },
    {
      id: 'landmarks',
      sql: 'SELECT the_geom_webmercator, lm_name, lm_type FROM landmarks_v0 WHERE lm_type = \'Individual Landmark\' OR lm_type = \'Interior Landmark\'',
    },
    {
      id: 'scenic-landmarks',
      sql: 'SELECT the_geom_webmercator, scen_lm_na FROM scenic_landmarks_v0',
    },
  ],
};
