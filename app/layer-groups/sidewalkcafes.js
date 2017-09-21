export default {
  id: 'sidewalkcafes',
  title: 'Sidewalk Cafes',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator FROM support_sidewalkcafes'], // only if type = carto
  layers: [
    {
      layer: {
        id: 'sidewalkcafes-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'yellow',
        },
      },
    },
  ],
};
