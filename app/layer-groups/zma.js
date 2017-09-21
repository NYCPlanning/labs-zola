export default {
  id: 'zma',
  title: 'Zoning Map Amendments',
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, ulurpno, status FROM support_nyzma'],
  visible: false,
  layers: [
    {
      layer: {
        id: 'zma-line',
        type: 'line',
        source: 'zma',
        'source-layer': 'layer0',
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
        'source-layer': 'layer0',
        paint: {
          'fill-color': '#9FC73E',
          'fill-opacity': 0.6,
        },
      },
    },
  ],
};
