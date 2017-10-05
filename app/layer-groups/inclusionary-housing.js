import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E57300';

export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing',
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
