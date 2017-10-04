import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'special-purpose-subdistricts',
  title: 'Special Purpose Subdistricts',
  visible: false,
  layers: [
    {
      layer: lineStyle('zoning-sp-sd-line', 'supporting-zoning', 'special-purpose-subdistricts', 'rgba(74, 189, 97, 1)'),
    },
    {
      layer: fillStyle('zoning-sp-sd-fill', 'supporting-zoning', 'special-purpose-subdistricts', 'rgba(74, 189, 97, 1)'),
      highlightable: true,
      tooltipTemplate: '{{spname}} - {{subdist}}',
    },
  ],
};
