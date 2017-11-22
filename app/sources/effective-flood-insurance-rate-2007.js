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
        END as fld_zone
        FROM support_waterfront_effective07
        WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
      `,
    },
  ],
};
