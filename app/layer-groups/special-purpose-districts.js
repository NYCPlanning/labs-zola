export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, sdname FROM support_nysp'],
  layers: [
    {
      layer: {
        id: 'zoning-sp-line',
        type: 'line',
        source: 'sp',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'red',
        },
      },
    },
  ],
};
