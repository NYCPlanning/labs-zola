export default {
  id: 'scenic-landmarks',
  title: 'Scenic Landmarks',
  visible: false,
  layers: [
    {
      layer: {
        id: 'sceniclandmarks-line',
        type: 'line',
        source: 'landmark-historic',
        'source-layer': 'scenic-landmarks',
        paint: {
          'line-width': 2,
          'line-color': 'purple',
        },
      },
    },
  ],
};
