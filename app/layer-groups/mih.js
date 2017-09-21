export default {
  id: 'mih',
  title: 'Mandatory Inclusionary Housing',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: 'SELECT the_geom_webmercator, projectnam FROM support_mih', // only if type = carto
  layers: [
    {
      layer: {
        id: 'mih-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'orange',
        },
      },
    },
  ],
};
