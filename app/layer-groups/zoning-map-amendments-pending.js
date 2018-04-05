const legendColor = '#B01F1F';

export default {
  id: 'zoning-map-amendments-pending',
  title: 'Pending Zoning Map Amendments',
  titleTooltip: 'Changes to the Zoning Map that are currently undergoing public review',
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
        id: 'zmacert-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'zoning-map-amendments-pending',
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
        id: 'zmacert-fill',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'zoning-map-amendments-pending',
        paint: {
          'fill-color': legendColor,
          'fill-opacity': 0.6,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{{project_na}}}',
    },
  ],
};
