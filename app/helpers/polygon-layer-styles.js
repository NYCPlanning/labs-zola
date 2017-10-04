const lineStyle = (id, source, sourceLayer, color) => ({
  id,
  type: 'line',
  source,
  'source-layer': sourceLayer,
  paint: {
    'line-width': 2,
    'line-color': color,
    'line-dasharray': [1, 2],
  },
  layout: {
    'line-cap': 'round',
    'line-join': 'miter',
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
