export default {
  id: 'supporting-zoning',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'special-purpose-districts',
      sql: 'SELECT the_geom_webmercator, cartodb_id, sdlbl, sdname FROM special_purpose_districts_v201804',
    },
    {
      id: 'special-purpose-subdistricts',
      sql: 'SELECT the_geom_webmercator, splbl, cartodb_id, spname, subdist FROM special_purpose_subdistricts_v201804',
    },
    {
      id: 'mandatory-inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam, mih_option FROM mandatory_inclusionary_housing_v20180425',
    },
    {
      id: 'inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam FROM inclusionary_housing_v201804',
    },
    {
      id: 'transit-zones',
      sql: 'SELECT the_geom_webmercator FROM transitzones_v201607',
    },
    {
      id: 'fresh',
      sql: 'SELECT the_geom_webmercator, name FROM fresh_zones_v201611',
    },
    {
      id: 'sidewalk-cafes',
      sql: 'SELECT the_geom_webmercator, cafetype FROM sidewalk_cafes_v201804',
    },
    {
      id: 'low-density-growth-mgmt-areas',
      sql: 'SELECT the_geom_webmercator FROM lower_density_growth_management_areas_v201709',
    },
    {
      id: 'coastal-zone-boundary',
      sql: 'SELECT the_geom_webmercator FROM coastal_zone_boundary_v201601',
    },
    {
      id: 'waterfront-access-plan',
      sql: 'SELECT the_geom_webmercator, name FROM waterfront_access_plan_v201109',
    },
    {
      id: 'zoning-map-amendments-pending',
      sql: 'SELECT the_geom_webmercator, ulurpno, status, project_na FROM zoning_map_amendments_v201804 WHERE status = \'Certified\'',
    },
    {
      id: 'limited-height-districts',
      sql: 'SELECT the_geom_webmercator, lhlbl FROM limited_height_districts_v201804',
    },
    {
      id: 'business-improvement-districts',
      sql: 'SELECT the_geom_webmercator, bid FROM business_improvement_districts_v0',
    },
    {
      id: 'e-designations',
      sql: 'SELECT the_geom_webmercator, bbl, ceqr_num, enumber, ulurp_num FROM e_designations_v20180417',
    },
  ],
};
