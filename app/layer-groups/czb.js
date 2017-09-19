export default {
  id: 'czb',
  title: 'Coastal Zone Boundary',
  visible: false,
  type: 'carto',
  sql: 'SELECT the_geom_webmercator FROM support_czb',
  layers: [
    {
      layer: {
        id: 'czb-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'green',
        },
      },
    },
  ],
};
