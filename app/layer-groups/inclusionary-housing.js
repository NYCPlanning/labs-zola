import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E57300';

export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing Designated Areas',
  titleTooltip: 'Areas where zoning incentives are offered to encourage the creation of permanently affordable housing',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
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
