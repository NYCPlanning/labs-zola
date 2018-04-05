const legendColor = '#9FC73E';

export default {
  id: 'zoning-map-amendments',
  title: 'Zoning Map Amendments',
  titleTooltip: 'Changes to the Zoning Map that have been adopted since 2002',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'April 5th, 2018',
  },
  layers: [
    {
      layer: {
        id: 'zma-line',
        type: 'line',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'line-width': {
            stops: [
              [11, 1],
              [12, 3],
            ],
          },
          'line-color': legendColor,
          'line-dasharray': [1, 1],
          'line-opacity': 0.6,
        },
      },
    },
    {
      layer: {
        id: 'zma-fill',
        type: 'fill',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'fill-color': legendColor,
          'fill-opacity': 0.6,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{{project_na}}} - Effective {{{effectiveformatted}}}',
    },
  ],
};
