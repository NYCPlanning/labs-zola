export default {
  id: 'transit-zones',
  title: 'Transit Zones',
  visible: false,
  titleTooltip: 'Areas where parking requirements are eliminated or reduced for affordable and senior housing units',
  layers: [
    {
      layer: {
        id: 'tz-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'transit-zones',
        paint: {
          'line-width': 2,
          'line-color': 'purple',
        },
      },
    },
  ],
};
