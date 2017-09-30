import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nyccouncildistricts',
  title: 'NYC Council Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'nyccouncildistricts-line',
        type: 'line',
        source: 'adminBoundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nyccouncildistricts-label',
        type: 'symbol',
        source: 'adminBoundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.labels,
        layout: labelLayout('coundist'),
      },
    },
  ],
};
