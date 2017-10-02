export default {
  id: 'zoning-map-amendments',
  title: 'Zoning Map Amendments',
  visible: false,
  layers: [
    {
      layer: {
        id: 'zma-line',
        type: 'line',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'line-width': {
            stops: [
              [11, 1],
              [12, 3],
            ],
          },
          'line-color': 'gray',
          'line-dasharray': [1, 1],
          'line-opacity': 0.6,
        },
      },
    },
    {
      layer: {
        id: 'zma-fill',
        type: 'fill',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'fill-color': '#9FC73E',
          'fill-opacity': 0.6,
        },
      },
      highlightable: true,
      tooltipTemplate: '{{{project_na}}} - Effective {{{effective}}}',
    },
  ],
};
