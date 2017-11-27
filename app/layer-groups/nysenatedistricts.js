import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nysenatedistricts',
  title: 'NY State Senate Districts',
  legendIcon: 'admin-line',
  legendColor: '#E4F576',
  visible: false,
  meta: {
    description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: {
        id: 'nysenatedistricts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        paint: {
          'line-color': '#E4F576',
          'line-opacity': 1,
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
        id: 'nysenatedistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nysenatedistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('stsendist'),
      },
    },
  ],
};
