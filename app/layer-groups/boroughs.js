import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout } = adminBoundaryStyles;

export default {
  id: 'boroughs',
  title: 'Boroughs',
  legendColor: '#F5B176',
  visible: false,
  layers: [
    {
      layer: {
        id: 'boroughs-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'boroughs',
        paint: {
          'line-color': '#F5B176',
          'line-opacity': 0.2,
          'line-width': {
            stops: [
              [11, 3],
              [16, 6],
            ],
          },
        },
      },
    },
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
  ],
};
