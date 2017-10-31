export default {
  id: 'effective-flood-insurance-rate-2007',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'effective-flood-insurance-rate-2007',
      sql: `
        SELECT the_geom_webmercator,
        CASE
          WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A'
          WHEN fld_zone = 'VE' THEN 'V'
          WHEN fld_zone = '0.2 PCT ANNUAL CHANCE FLOOD HAZARD' THEN 'Shaded X'
        END as fld_zone
        FROM support_waterfront_effective07
        WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE' OR fld_zone = '0.2 PCT ANNUAL CHANCE FLOOD HAZARD'
      `,
    },
  ],
};
