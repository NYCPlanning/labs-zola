export default {
  id: 'low-density-growth-mgmt-areas',
  title: 'Low Density Growth Management Areas',
  visible: false,
  layers: [
    {
      layer: {
        id: 'ldgma-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'low-density-growth-mgmt-areas',
        paint: {
          'line-width': 2,
          'line-color': 'orange',
        },
      },
    },
  ],
};
