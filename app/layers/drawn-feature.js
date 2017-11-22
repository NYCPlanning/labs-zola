export default {
  line: {
    id: 'drawn-feature-line',
    type: 'line',
    source: 'drawn-feature',
    paint: {
      'line-color': 'rgba(62, 35, 234, 1)',
      'line-opacity': 0.7,
      'line-width': 2,
      'line-dasharray': [
        5,
        2,
      ],
    },
  },
  fill: {
    id: 'drawn-feature-fill',
    type: 'fill',
    source: 'drawn-feature',
    paint: {
      'fill-opacity': 0.1,
      'fill-color': 'rgba(84, 68, 210, 1)',
    },
    layout: {},
  },
};
