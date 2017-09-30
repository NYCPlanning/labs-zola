export default {
  id: 'landmarks',
  title: 'Landmarks',
  visible: false,
  layers: [
    {
      layer: {
        id: 'landmarkpoints-circle',
        type: 'circle',
        source: 'landmark-historic',
        'source-layer': 'landmarks',
        paint: {
          'circle-radius': { stops: [[10, 3], [15, 7]] },
          'circle-color': 'steelblue',
          'circle-opacity': 0.7,
        },
      },
    },
  ],
};
