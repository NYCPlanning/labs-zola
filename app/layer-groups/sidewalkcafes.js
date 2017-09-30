export default {
  id: 'sidewalkcafes',
  title: 'Sidewalk Cafes',
  visible: false,
  layers: [
    {
      layer: {
        id: 'sidewalkcafes-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': 2,
          'line-color': 'yellow',
        },
      },
    },
  ],
};
