import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'waterfront-access-plan',
  title: 'Waterfront Access Plan',
  visible: false,
  layers: [
    {
      layer: lineStyle('waterfront-access-plan-line', 'supporting-zoning', 'waterfront-access-plan', 'rgba(18, 0, 255, 1)'),
    },
    {
      layer: fillStyle('waterfront-access-plan-fill', 'supporting-zoning', 'waterfront-access-plan', 'rgba(18, 0, 255, 1)'),
      highlightable: true,
      tooltipTemplate: 'Waterfront Access Plan - {{{name}}}',
    },
  ],
};
