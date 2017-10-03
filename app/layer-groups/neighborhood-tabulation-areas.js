import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'neighborhood-tabulation-areas',
  title: 'Neighborhood Tabulation Areas',
  visible: false,
  layers: [
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
