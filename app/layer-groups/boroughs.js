import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout } = adminBoundaryStyles;

export default {
  id: 'boroughs',
  title: 'Boroughs',
  legendIcon: 'admin-line',
  legendColor: '#F5B176',
  visible: false,
  meta: {
    description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '21 November 2017',
  },
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
