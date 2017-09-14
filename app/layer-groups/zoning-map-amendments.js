export default {
  id: 'zoning-map-amendments',
  title: 'Zoning Map Amendments',
  type: 'carto',
  sql: 'SELECT the_geom_webmercator, ulurpno FROM support_nyzma',
  visible: true,
  layers: [
    {
      layer: {
        id: 'zma',
        type: 'line',
        source: 'zoning-map-amendments',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'red',
          'line-dasharray': [1, 1],
          'line-opacity': 0.6,
        },
      },
    },
  ],
};
