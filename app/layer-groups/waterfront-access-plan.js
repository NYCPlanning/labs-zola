export default {
  id: 'waterfront-access-plan',
  title: 'Waterfront Access Plan',
  visible: false,
  layers: [
    {
      layer: {
        id: 'wap-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'waterfront-access-plan',
        paint: {
          'line-width': 2,
          'line-color': 'red',
        },
      },
    },
  ],
};
