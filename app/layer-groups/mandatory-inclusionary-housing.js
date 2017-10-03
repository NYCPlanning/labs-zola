export default {
  id: 'mandatory-inclusionary-housing',
  title: 'Mandatory Inclusionary Housing',
  visible: false,
  layers: [
    {
      layer: {
        id: 'mih-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'mandatory-inclusionary-housing',
        paint: {
          'line-width': 2,
          'line-color': 'orange',
        },
      },
    },
  ],
};
