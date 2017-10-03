export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing',
  visible: false,
  layers: [
    {
      layer: {
        id: 'layer-group-id',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'inclusionary-housing',
        paint: {
          'line-width': 2,
          'line-color': 'pink',
        },
      },
    },
  ],
};
