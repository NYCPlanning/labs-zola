import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#76420a';

export default {
  id: 'limited-height-districts',
  title: 'Limited Height District',
  titleTooltip: 'Lorem Ipsum',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('limited-height-districts-line', 'supporting-zoning', 'limited-height-districts', legendColor),
    },

    {
      layer: fillStyle('limited-height-districts-fill', 'supporting-zoning', 'limited-height-districts', legendColor),
      highlightable: true,
      tooltipTemplate: 'Limited height district - {{lhlbl}}',
    },
  ],
};
