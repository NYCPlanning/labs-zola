import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'boroughs',
  title: 'Boroughs',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, boroname FROM support_admin_boroboundaries'],
  layers: [
    {
      layer: {
        id: 'boroughs-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'boroughs-label',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: paint.labels,
        layout: labelLayout('boroname'),
      },
    },
  ],
};
