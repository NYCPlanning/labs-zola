export default {
  id: 'bookmarked-lots',
  type: 'line',
  source: 'pluto',
  'source-layer': 'pluto',
  layout: {
    'line-cap': 'round',
  },
  paint: {
    'line-opacity': 0.8,
    'line-color': 'rgba(0, 25, 160, 1)',
    'line-width': {
      stops: [
        [
          13,
          1.5,
        ],
        [
          15,
          8,
        ],
      ],
    },
  },
};
