const adminBoundaryStyles = {
  paint: {
    lines: {
      'line-color': '#444',
      'line-opacity': 0.3,
      'line-width': {
        stops: [
          [11, 1],
          [16, 3],
        ],
      },
    },
    labels: {
      'text-color': '#626262',
      'text-halo-color': '#FFFFFF',
      'text-halo-width': 2,
      'text-halo-blur': 2,
    },
  },

  layout: {
    lines: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  },
  labelLayout: field => ({
    'text-field': `{${field}}`,
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-size': {
      stops: [
        [11, 12],
        [14, 16],
      ],
    },
  }),
};

export default adminBoundaryStyles;
