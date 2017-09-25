export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: ['SELECT the_geom_webmercator, projectnam FROM support_ih'], // only if type = carto
  layers: [
    {
      layer: {
        id: 'layer-group-id',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'pink',
        },
      },
    },
  ],
};
