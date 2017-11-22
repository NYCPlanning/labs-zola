import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E6D62E';

export default {
  id: 'transit-zones',
  title: 'Transit Zones',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  titleTooltip: 'Transit-accessible areas where parking is optional for new affordable housing units and special rules apply to existing affordable units',
  layers: [
    {
      layer: lineStyle('transit-zones-line', 'supporting-zoning', 'transit-zones', legendColor),
    },
    {
      layer: fillStyle('transit-zones-fill', 'supporting-zoning', 'transit-zones', legendColor),
      highlightable: true,
      tooltipTemplate: 'Transit Zone',
    },
  ],
};
