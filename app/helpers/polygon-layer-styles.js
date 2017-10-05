const lineStyle = (id, source, sourceLayer, color) => ({
  id,
  type: 'line',
  source,
  'source-layer': sourceLayer,
  paint: {
    'line-width': {
      stops: [
        [11, 1],
        [12, 3],
      ],
    },
    'line-color': color,
    'line-dasharray': [1, 1],
    'line-opacity': 0.6,
  },
});

const fillStyle = (id, source, sourceLayer, color) => ({
  id,
  type: 'fill',
  source,
  'source-layer': sourceLayer,
  paint: {
    'fill-color': color,
    'fill-opacity': 0.2,
  },
  layout: {},
});

export {
  lineStyle,
  fillStyle,
};
