import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  visible: false,
  layers: [
    {
      layer: lineStyle('zoning-sp-line', 'supporting-zoning', 'special-purpose-districts', 'rgba(21, 83, 30, 1)'),
    },

    {
      layer: fillStyle('zoning-sp-fill', 'supporting-zoning', 'special-purpose-districts', 'rgba(21, 83, 30, 1)'),
      highlightable: true,
      tooltipTemplate: '{{sdname}}',
    },
  ],
};
