export default {
  id: 'landmarkpoints',
  title: 'Landmarks',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, lm_name FROM landmarkpoints WHERE lm_type = \'Individual Landmark\' OR lm_type = \'Interior Landmark\''],
  layers: [
    {
      layer: {
        id: 'landmarkpoints-circle',
        type: 'circle',
        'source-layer': 'layer0',
        paint: {
          'circle-radius': { stops: [[10, 3], [15, 7]] },
          'circle-color': 'steelblue',
          'circle-opacity': 0.7,
        },
      },
    },
  ],
};
