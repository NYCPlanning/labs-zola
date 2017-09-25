export default {
  id: 'waterfront-access-plan',
  title: 'Waterfront Access Plan',
  visible: false,
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, name FROM support_wap'],
  layers: [
    {
      layer: {
        id: 'wap-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'red',
        },
      },
    },
  ],
};
