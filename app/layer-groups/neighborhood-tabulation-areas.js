import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'neighborhood-tabulation-areas',
  title: 'Neighborhood Tabulation Areas',
  legendIcon: 'admin-line',
  legendColor: '#F576CC',
  visible: false,
  layers: [
    {
      layer: {
        id: 'nta-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'line-color': '#F576CC',
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
        id: 'nta-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nta-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas-centroids',
        minzoom: 12,
        paint: paint.labels,
        layout: labelLayout('ntaname'),
      },
    },
  ],
};
