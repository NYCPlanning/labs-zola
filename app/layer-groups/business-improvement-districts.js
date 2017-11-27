import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#76420a';

export default {
  id: 'business-improvement-districts',
  title: 'Business Improvement Districts',
  titleTooltip: 'A Business Improvement District (BID) is a geographical area where local stakeholders oversee and fund the maintenance, improvement, and promotion of their commercial district.',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Business Improvement Districts Shapefile on the NYC Open Data Portal',
    url: ['https://data.cityofnewyork.us/Business/Business-Improvement-Districts/ejxk-d93y/data'],
    updated_at: '20 November 2017',
  },
  layers: [
    {
      layer: lineStyle('business-improvement-districts-line', 'supporting-zoning', 'business-improvement-districts', legendColor),
    },

    {
      layer: fillStyle('business-improvement-districts-fill', 'supporting-zoning', 'business-improvement-districts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{bid}}}',
    },
  ],
};
