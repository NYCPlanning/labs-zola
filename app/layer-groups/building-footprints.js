export default {
  id: 'building-footprints',
  title: 'Building Footprints',
  titleTooltip: 'Building footprints based on OpenStreetMap data',
  visible: true,
  meta: {
    description: 'OpenStreetMap Building Footprints via Mapbox Vector Tile Service',
    url: ['https://www.openstreetmap.org/'],
    updated_at: null,
  },
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
          'fill-opacity': {
            stops: [
              [15, 0],
              [16, 0.3],
            ],
          },
          'fill-outline-color': 'rgba(12, 12, 12, 1)',
          'fill-color': 'rgba(175, 175, 175, 1)',
        },
        layout: {},
      },
    },
  ],
};
