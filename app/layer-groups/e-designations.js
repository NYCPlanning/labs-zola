export default {
  id: 'e-designations',
  title: 'Environmental Designations',
  titleTooltip: 'Lorem Ipsum',
  visible: true,
  layers: [
    {
      layer: {
        id: 'e-designations-circle',
        type: 'circle',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        paint: {
          'circle-radius': 5,
          'circle-color': 'rgba(255, 255, 255, 0.65)',
          'circle-stroke-opacity': {
            stops: [
              [
                6,
                1,
              ],
              [
                10,
                1,
              ],
            ],
          },
          'circle-stroke-color': 'rgba(52, 33, 220, 1)',
          'circle-pitch-scale': 'map',
          'circle-stroke-width': 1.5,
          'circle-opacity': 1,
        },
      },
    },
    {
      layer: {
        id: 'e-designations-label',
        type: 'symbol',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        minzoom: 11,
        layout: {
          'text-field': 'E',
          'text-size': 8,
          'text-allow-overlap': true,
        },
      },
    },
  ],
};
