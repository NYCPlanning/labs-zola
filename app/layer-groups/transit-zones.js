import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'transit-zones',
  title: 'Transit Zones',
  visible: false,
  titleTooltip: 'Areas where parking requirements are eliminated or reduced for affordable and senior housing units',
  layers: [
    {
      layer: lineStyle('transit-zones-line', 'supporting-zoning', 'transit-zones', 'purple'),
    },
    {
      layer: fillStyle('transit-zones-fill', 'supporting-zoning', 'transit-zones', 'purple'),
      highlightable: true,
      tooltipTemplate: 'Transit Zone',
    },
  ],
};
