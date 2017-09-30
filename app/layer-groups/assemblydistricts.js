import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'assemblydistricts',
  title: 'New York State Assembly Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'assemblydistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-assembly-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'assemblydistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'ny-assembly-districts',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('assemdist'),
      },
    },
  ],
};
