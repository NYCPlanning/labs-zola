import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#00A4D2';

export default {
  id: 'waterfront-access-plan',
  title: 'Waterfront Access Plan',
  titleTooltip: 'These areas reflect site specific modification of waterfront public access requirements for waterfront parcels with unique conditions and opportunities',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Waterfront Access Plan release 2011.1, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'September 2017',
  },
  layers: [
    {
      layer: lineStyle('waterfront-access-plan-line', 'supporting-zoning', 'waterfront-access-plan', legendColor),
    },
    {
      layer: fillStyle('waterfront-access-plan-fill', 'supporting-zoning', 'waterfront-access-plan', legendColor),
      highlightable: true,
      tooltipTemplate: 'Waterfront Access Plan - {{{name}}}',
    },
  ],
};
