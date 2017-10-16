import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#8DA610';

export default {
  id: 'special-purpose-subdistricts',
  title: 'Special Purpose Subdistricts',
  titleTooltip: 'The regulations for special purpose districts are designed to supplement and modify the underlying zoning in order to respond to distinctive neighborhoods with particular issues and goals.',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('zoning-sp-sd-line', 'supporting-zoning', 'special-purpose-subdistricts', legendColor),
    },
    {
      layer: fillStyle('zoning-sp-sd-fill', 'supporting-zoning', 'special-purpose-subdistricts', legendColor),
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{spname}} - {{subdist}}',
    },
  ],
};
