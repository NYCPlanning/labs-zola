export default {
  id: 'historic-districts',
  title: 'Historic Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'historicdistricts-line',
        type: 'line',
        source: 'landmark-historic',
        'source-layer': 'historic-districts',
        paint: {
          'line-width': 2,
          'line-color': 'orange',
        },
      },
    },
  ],
};
