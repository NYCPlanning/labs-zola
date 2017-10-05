import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'steelblue';

export default {
  id: 'fresh',
  title: 'FRESH Zones',
  titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives to eligible grocery store operators and developers.',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('fresh-line', 'supporting-zoning', 'fresh', legendColor),
    },
    {
      layer: fillStyle('fresh-fill', 'supporting-zoning', 'fresh', legendColor),
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}',
    },
  ],
};
