const comparisonSelectedLayers = {
  fill: {
    id: 'comparison-selected-fill',
    type: 'fill',
    source: 'comparison-selected-lot',
    paint: {
      'fill-opacity': 0.6,
      'fill-color': 'rgba(0, 20, 130, 1)',
    },
  },
  line: {
    id: 'comparison-selected-line',
    type: 'line',
    source: 'comparison-selected-lot',
    layout: {
      'line-cap': 'round',
    },
    paint: {
      'line-opacity': 0.9,
      'line-color': 'rgba(0, 10, 90, 1)',
      'line-width': {
        stops: [
          [13, 1.5],
          [15, 8],
        ],
      },
      'line-dasharray': [2, 1.5],
    },
  },
};

export default comparisonSelectedLayers;
