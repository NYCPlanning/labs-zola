export default {
  id: 'layer-group-id',
  title: 'Layer Group',
  visible: true,
  type: 'carto', // raster, vector, geojson, or carto
  // sql: '', // only if type = carto
  layers: [
    {
      layer: {
        id: 'layer-group-id',
        type: 'line',
        source: 'layer-group-id',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'red',
        },
      },
    },
  ],
};
