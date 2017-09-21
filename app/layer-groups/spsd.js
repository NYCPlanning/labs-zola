export default {
  id: 'spsd',
  title: 'Special Purpose Subdistricts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: 'SELECT the_geom_webmercator, spname FROM support_nysp_sd',
  layers: [
    {
      layer: {
        id: 'zoning-sp-sd-line',
        type: 'line',
        source: 'spsd',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'green',
        },
      },
    },
  ],
};
