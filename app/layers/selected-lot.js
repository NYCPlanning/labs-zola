const selectedLayers = {
  fill: {
    id: 'selected-fill',
    type: 'fill',
    source: 'selected-lot',
    paint: {
      'fill-opacity': 0,
      'fill-color': 'steelblue',
    },
  },
  line: {
    id: 'selected-line',
    type: 'line',
    source: 'selected-lot',
    paint: {
      'line-opacity': 1,
      // 'line-dasharray': [1, 1],
      'line-color': 'red',
      'line-width': {
        stops: [
          [13, 1.5],
          [14, 4],
          [15, 6],
        ],
      },
    },
  },
};

export default selectedLayers;
