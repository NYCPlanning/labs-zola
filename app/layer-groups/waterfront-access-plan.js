import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'rgba(18, 0, 255, 1)';

export default {
  id: 'waterfront-access-plan',
  title: 'Waterfront Access Plan',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
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
