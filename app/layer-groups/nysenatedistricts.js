import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nysenatedistricts',
  title: 'New York State Senate Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'nysenatedistricts-line',
        type: 'line',
        source: 'adminBoundaries',
        'source-layer': 'ny-senate-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nysenatedistricts-label',
        type: 'symbol',
        source: 'adminBoundaries',
        'source-layer': 'ny-senate-districts',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('stsendist'),
      },
    },
  ],
};
