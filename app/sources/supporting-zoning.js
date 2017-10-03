export default {
  id: 'supporting-zoning',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'special-purpose-districts',
      sql: 'SELECT the_geom_webmercator, sdname FROM support_nysp',
    },
    {
      id: 'special-purpose-subdistricts',
      sql: 'SELECT the_geom_webmercator, spname FROM support_nysp_sd',
    },
    {
      id: 'mandatory-inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam FROM support_mih',
    },
    {
      id: 'inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam FROM support_ih',
    },
    {
      id: 'transit-zones',
      sql: 'SELECT the_geom_webmercator FROM support_tz',
    },
    {
      id: 'fresh',
      sql: 'SELECT the_geom_webmercator, name FROM support_fresh',
    },
    {
      id: 'sidewalk-cafes',
      sql: 'SELECT the_geom_webmercator FROM support_sidewalkcafes',
    },
    {
      id: 'low-density-growth-mgmt-areas',
      sql: 'SELECT the_geom_webmercator FROM support_ldgma',
    },
    {
      id: 'coastal-zone-boundary',
      sql: 'SELECT the_geom_webmercator FROM support_czb',
    },
    {
      id: 'waterfront-access-plan',
      sql: 'SELECT the_geom_webmercator, name FROM support_wap',
    },
    {
      id: 'zoning-map-amendments-pending',
      sql: 'SELECT the_geom_webmercator, ulurpno, status FROM support_nyzma WHERE status = \'Certified\'',
    },
  ],
};
