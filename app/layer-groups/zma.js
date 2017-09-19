export default {
  id: 'zma',
  title: 'Zoning Map Amendments',
  type: 'carto',
  sql: 'SELECT the_geom_webmercator, ulurpno FROM support_nyzma',
  visible: false,
  layers: [
    {
      layer: {
        id: 'zma-fill',
        type: 'fill',
        source: 'zoning-map-amendments',
        'source-layer': 'layer0',
        paint: {
          'fill-color': 'lightblue',
          'fill-opacity': 0.2,
        },
      },
    },
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
          'line-color': 'blue',
          'line-dasharray': [1, 1],
          'line-opacity': 0.6,
        },
      },
    },
  ],
};
