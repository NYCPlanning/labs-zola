import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E57300';

export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing',
  titleTooltip: 'In these districts, the "base" FAR allowed if the development does not participate in the Inclusionary Housing program is generally lower than the standard FAR for the district, and the maximum FAR available with the bonus is higher than the standard FAR.',
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
