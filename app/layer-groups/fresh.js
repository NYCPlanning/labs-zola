export default {
  id: 'fresh',
  title: 'FRESH Zones',
  titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives to eligible grocery store operators and developers.',
  visible: false,
  layers: [
    {
      layer: {
        id: 'fresh-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'line-width': 2,
          'line-color': 'steelblue',
        },
      },
    },
  ],
};
