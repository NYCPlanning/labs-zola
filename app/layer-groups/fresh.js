export default {
  id: 'fresh',
  title: 'FRESH Zones',
  visible: false,
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, name FROM support_fresh'],
  layers: [
    {
      layer: {
        id: 'fresh-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'steelblue',
        },
      },
    },
  ],
};
