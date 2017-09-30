import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'community-districts',
  title: 'Community Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'community-districts-line',
        type: 'line',
        source: 'adminBoundaries',
        'source-layer': 'community-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'community-districts-label',
        type: 'symbol',
        source: 'adminBoundaries',
        'source-layer': 'community-districts',
        minzoom: 11,
        paint: paint.labels,
        layout: labelLayout('boro_district'),
      },
    },
  ],
};
