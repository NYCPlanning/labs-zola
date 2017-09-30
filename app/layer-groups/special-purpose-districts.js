export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'zoning-sp-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'special-purpose-districts',
        paint: {
          'line-width': 2,
          'line-color': 'red',
        },
      },
    },
  ],
};
