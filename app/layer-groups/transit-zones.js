export default {
  id: 'transit-zones',
  title: 'Transit Zones',
  visible: false,
  type: 'carto',
  sql: ['SELECT the_geom_webmercator FROM support_tz'],
  layers: [
    {
      layer: {
        id: 'tz-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'purple',
        },
      },
    },
  ],
};
