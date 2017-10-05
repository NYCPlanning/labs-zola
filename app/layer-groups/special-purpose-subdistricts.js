import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'rgba(74, 189, 97, 1)';

export default {
  id: 'special-purpose-subdistricts',
  title: 'Special Purpose Subdistricts',
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
      tooltipTemplate: '{{spname}} - {{subdist}}',
    },
  ],
};
