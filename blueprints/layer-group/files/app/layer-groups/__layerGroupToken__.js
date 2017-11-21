export default {
  id: 'layer-group-id',
  title: 'Layer Group',
  titleTooltip: 'Lorem Ipsum',
  visible: true,
  legendIcon: 'polygon',
  legendColor: 'steelblue',
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
