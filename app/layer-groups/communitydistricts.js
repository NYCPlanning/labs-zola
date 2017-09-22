import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'communitydistricts',
  title: 'Community Districts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: [
    `SELECT the_geom_webmercator, borocd,
      CASE
        WHEN LEFT(borocd::text, 1) = '1' THEN 'Manhattan ' || borocd % 100
        WHEN LEFT(borocd::text, 1) = '2' THEN 'Bronx ' || borocd % 100
        WHEN LEFT(borocd::text, 1) = '3' THEN 'Brooklyn ' || borocd % 100
        WHEN LEFT(borocd::text, 1) = '4' THEN 'Queens ' || borocd % 100
        WHEN LEFT(borocd::text, 1) = '5' THEN 'Staten Island ' || borocd % 100
      END as boro_district
    FROM support_admin_cdboundaries
    WHERE borocd % 100 < 20`,
  ],
  layers: [
    {
      layer: {
        id: 'communitydistricts-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'communitydistricts-label',
        type: 'symbol',
        'source-layer': 'layer0',
        minzoom: 11,
        paint: paint.labels,
        layout: labelLayout('boro_district'),
      },
    },
  ],
};
