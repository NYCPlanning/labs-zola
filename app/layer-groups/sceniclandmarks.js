export default {
  id: 'sceniclandmarks',
  title: 'Scenic Landmarks',
  visible: false,
  type: 'carto',
  sql: 'SELECT the_geom_webmercator, scen_lm_na FROM support_sceniclandmarks',
  layers: [
    {
      layer: {
        id: 'sceniclandmarks-line',
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
