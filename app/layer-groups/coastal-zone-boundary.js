export default {
  id: 'coastal-zone-boundary',
  title: 'Coastal Zone Boundary',
  visible: false,
  layers: [
    {
      layer: {
        id: 'czb-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'coastal-zone-boundary',
        paint: {
          'line-width': 2,
          'line-color': 'green',
        },
      },
    },
  ],
};
