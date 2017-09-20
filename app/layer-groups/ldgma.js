export default {
  id: 'ldgma',
  title: 'Low Density Growth Management Areas',
  visible: false,
  type: 'carto',
  sql: 'SELECT the_geom_webmercator FROM support_ldgma',
  layers: [
    {
      layer: {
        id: 'ldgma-line',
        type: 'line',
        source: 'layer-group-id',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'orange',
        },
      },
    },
  ],
};
