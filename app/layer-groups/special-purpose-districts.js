import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

const legendColor = 'rgba(21, 83, 30, 1)';

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
