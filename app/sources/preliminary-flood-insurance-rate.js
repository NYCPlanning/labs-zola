export default {
  id: 'preliminary-flood-insurance-rate',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'preliminary-flood-insurance-rate',
      sql: 'SELECT the_geom_webmercator, fld_zone FROM support_waterfront_pfirm15 WHERE fld_zone = \'AE\' OR fld_zone = \'A\'OR fld_zone = \'AO\' OR fld_zone = \'VE\' OR fld_zone = \'0.2 PCT ANNUAL CHANCE FLOOD HAZARD\'',
    },
  ],
};
