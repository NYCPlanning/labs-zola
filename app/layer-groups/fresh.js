export default {
  id: 'fresh',
  title: 'FRESH Zones',
  titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives to eligible grocery store operators and developers.',
  visible: false,
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, name FROM support_fresh'],
  layers: [
    {
      layer: {
        id: 'fresh-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: {
          'line-width': 2,
          'line-color': 'steelblue',
        },
      },
    },
  ],
};
