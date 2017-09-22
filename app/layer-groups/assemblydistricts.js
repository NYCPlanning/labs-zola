import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'assemblydistricts',
  title: 'New York State Assembly Districts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, assemdist FROM support_admin_assemblydistricts'],
  layers: [
    {
      layer: {
        id: 'assemblydistricts-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'assemblydistricts-label',
        type: 'symbol',
        'source-layer': 'layer0',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('assemdist'),
      },
    },
  ],
};
