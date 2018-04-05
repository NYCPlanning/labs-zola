export default {
  id: 'commercial-overlays',
  title: 'Commercial Overlays',
  titleTooltip: 'A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs.',
  visible: true,
  meta: {
    description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'April 5th, 2018',
  },
  layers: [
    {
      layer: {
        id: 'co-fill',
        type: 'fill',
        source: 'commercial-overlays',
        minzoom: 12,
        'source-layer': 'commercial-overlays',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-opacity': 0,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{overlay}}',
    },
    {
      layer: {
        id: 'co',
        type: 'line',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'line-width': {
            stops: [
              [
                12,
                0.1,
              ],
              [
                15,
                2,
              ],
            ],
          },
          'line-opacity': 0.75,
          'line-color': 'rgba(220, 10, 10, 1)',
        },
      },
    },
    {
      layer: {
        id: 'co_labels',
        type: 'symbol',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'text-color': 'rgba(200, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': 0.9,
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}',
        },
        minzoom: 14,
      },
    },
  ],
};
