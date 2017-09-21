export default {
  id: 'historicdistricts',
  title: 'Historic Districts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: 'SELECT the_geom_webmercator, area_name FROM support_historicdistricts',
  layers: [
    {
      layer: {
        id: 'historicdistricts-line',
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
