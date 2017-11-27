import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E57300';

export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing Designated Areas',
  titleTooltip: 'Areas where zoning incentives are offered to encourage the creation of permanently affordable housing',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Inclusionary Housing Designated Areas release 2017.7, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'September 2017',
  },
  layers: [
    {
      layer: lineStyle('inclusionary-housing-line', 'supporting-zoning', 'inclusionary-housing', legendColor),
    },
    {
      layer: fillStyle('inclusionary-housing-fill', 'supporting-zoning', 'inclusionary-housing', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{projectnam}}}',
    },
  ],
};
