export default {
  id: 'building-footprints',
  title: 'Building Footprints',
  titleTooltip: 'Building footprints based on OpenStreetMap data',
  visible: false,
  layers: [
    {
      layer: {
        id: 'building',
        type: 'fill',
        source: 'composite',
        'source-layer': 'building',
        minzoom: 15,
        filter: [
          'all',
          [
            '!=',
            'type',
            'building:part',
          ],
          [
            '==',
            'underground',
            'false',
          ],
        ],
        paint: {
          'fill-opacity': 0.3,
          'fill-outline-color': 'rgba(12, 12, 12, 1)',
          'fill-color': 'rgba(175, 175, 175, 1)',
        },
        layout: {},
      },
    },
  ],
};
