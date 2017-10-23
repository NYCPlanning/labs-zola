export default {
  id: 'effective-flood-insurance-rate-2007',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'effective-flood-insurance-rate-2007',
      sql: 'SELECT the_geom_webmercator, fld_zone FROM support_waterfront_effective07 WHERE fld_zone = \'AE\' OR fld_zone = \'A\'OR fld_zone = \'AO\' OR fld_zone = \'VE\' OR fld_zone = \'0.2 PCT ANNUAL CHANCE FLOOD HAZARD\'',
    },
  ],
};
