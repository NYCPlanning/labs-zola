import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nysenatedistricts',
  title: 'New York State Senate Districts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, stsendist FROM support_admin_nysenatedistricts'],
  layers: [
    {
      layer: {
        id: 'nysenatedistricts-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nysenatedistricts-label',
        type: 'symbol',
        'source-layer': 'layer0',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('stsendist'),
      },
    },
  ],
};
