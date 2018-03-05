export default {
  id: 'preliminary-flood-insurance-rate',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'preliminary-flood-insurance-rate',
      sql: `
        SELECT the_geom_webmercator,
        CASE
          WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A'
          WHEN fld_zone = 'VE' THEN 'V'
          WHEN fld_zone = '0.2 PCT ANNUAL CHANCE FLOOD HAZARD' THEN 'Shaded X'
        END as fld_zone
        FROM floodplain_pfirm2015_v0
        WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
      `,
    },
  ],
};
