import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'boroughs',
  title: 'Boroughs',
  visible: false,
  layers: [
    {
      layer: {
        id: 'boroughs-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'boroughs',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'boroughs-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'boroughs',
        paint: paint.labels,
        layout: labelLayout('boroname'),
      },
    },
  ],
};
