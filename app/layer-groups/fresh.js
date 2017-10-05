import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'fresh',
  title: 'FRESH Zones',
  titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives to eligible grocery store operators and developers.',
  visible: false,
  layers: [
    {
      layer: lineStyle('fresh-line', 'supporting-zoning', 'fresh', 'steelblue'),
    },
    {
      layer: fillStyle('fresh-fill', 'supporting-zoning', 'fresh', 'steelblue'),
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}',
    },
  ],
};
