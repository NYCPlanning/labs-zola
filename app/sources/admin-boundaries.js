export default {
  id: 'admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'community-districts',
      sql: `
        SELECT the_geom_webmercator, borocd,
          CASE
            WHEN LEFT(borocd::text, 1) = '1' THEN 'Manhattan ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '2' THEN 'Bronx ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '3' THEN 'Brooklyn ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '4' THEN 'Queens ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '5' THEN 'Staten Island ' || borocd % 100
          END as boro_district
        FROM support_admin_cdboundaries
        WHERE borocd % 100 < 20
      `,
    },

    {
      id: 'neighborhood-tabulation-areas',
      sql: 'SELECT the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname FROM support_admin_boroboundaries',
    },

    {
      id: 'nyc-council-districts',
      sql: 'SELECT the_geom_webmercator, coundist FROM support_admin_nyccouncildistricts',
    },

    {
      id: 'ny-senate-districts',
      sql: 'SELECT the_geom_webmercator, stsendist FROM support_admin_nysenatedistricts',
    },

    {
      id: 'ny-assembly-districts',
      sql: 'SELECT the_geom_webmercator, assemdist FROM support_admin_assemblydistricts',
    },
  ],
};
