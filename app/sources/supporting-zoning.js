export default {
  id: 'supporting-zoning',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'special-purpose-districts',
      sql: 'SELECT the_geom_webmercator, cartodb_id, sdlbl, sdname FROM support_zoning_sp',
    },
    {
      id: 'special-purpose-subdistricts',
      sql: 'SELECT the_geom_webmercator, splbl, cartodb_id, spname, subdist FROM support_zoning_spsd',
    },
    {
      id: 'mandatory-inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam, mih_option FROM mandatory_inclusionary_housing_v20180223',
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
      sql: 'SELECT the_geom_webmercator, cafetype FROM support_sidewalkcafes',
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
      sql: 'SELECT the_geom_webmercator, ulurpno, status, project_na FROM support_zoning_zma WHERE status = \'Certified\'',
    },
    {
      id: 'limited-height-districts',
      sql: 'SELECT the_geom_webmercator, lhlbl FROM limited_height_districts',
    },
    {
      id: 'business-improvement-districts',
      sql: 'SELECT the_geom_webmercator, bid FROM business_improvement_districts',
    },
    {
      id: 'e-designations',
      sql: 'SELECT the_geom_webmercator, bbl, ceqr_num, enumber, ulurp_num FROM e_designations',
    },
  ],
};
