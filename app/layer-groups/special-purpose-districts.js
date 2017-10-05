import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#5E6633';

export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('zoning-sp-line', 'supporting-zoning', 'special-purpose-districts', legendColor),
    },

    {
      layer: fillStyle('zoning-sp-fill', 'supporting-zoning', 'special-purpose-districts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{sdname}}',
    },
  ],
};
