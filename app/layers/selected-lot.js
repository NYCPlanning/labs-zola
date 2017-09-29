const selectedLayers = {
  fill: {
    id: 'selected-fill',
    type: 'fill',
    source: 'selected-lot',
    paint: {
      'fill-opacity': 0.1,
      'fill-color': 'red',
    },
  },
  line: {
    id: 'selected-line',
    type: 'line',
    source: 'selected-lot',
    paint: {
      'line-opacity': 0.6,
      // 'line-dasharray': [1, 1],
      'line-color': 'red',
      'line-width': {
        stops: [
          [13, 1],
          [15, 4],
        ],
      },
      'line-dasharray': [0, 1.5],
    },
    layout: {
      'line-cap': 'round',
    },
  },
};

export default selectedLayers;
