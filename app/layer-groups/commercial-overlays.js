export default {
  id: 'commercial-overlays',
  title: 'Commercial Overlays',
  titleTooltip: 'A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs.',
  visible: false,
  layers: [
    {
      layer: {
        id: 'co',
        type: 'line',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'line-width': {
            stops: [
              [13, 1],
              [14, 3],
            ],
          },
          'line-opacity': 0.75,
          'line-color': 'rgba(220, 10, 10, 1)',
        },
      },
    },
    {
      layer: {
        id: 'co_labels',
        type: 'symbol',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'text-color': 'rgba(200, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': 0.9,
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}',
        },
        minzoom: 14,
      },
    },
  ],
};
