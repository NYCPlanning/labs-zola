export default {
  id: 'landmarks',
  title: 'Landmarks',
  titleTooltip: 'Sites with landmark status granted by the NYC Landmarks Preservation Commission',
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
