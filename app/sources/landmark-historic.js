export default {
  id: 'landmark-historic',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'historic-districts',
      sql: 'SELECT the_geom_webmercator, area_name FROM support_historicdistricts',
    },
    {
      id: 'landmarks',
      sql: 'SELECT the_geom_webmercator, lm_name, lm_type FROM landmarkpoints WHERE lm_type = \'Individual Landmark\' OR lm_type = \'Interior Landmark\'',
    },
    {
      id: 'scenic-landmarks',
      sql: 'SELECT the_geom_webmercator, scen_lm_na FROM support_sceniclandmarks',
    },
  ],
};
