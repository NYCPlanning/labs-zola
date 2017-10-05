import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'inclusionary-housing',
  title: 'Inclusionary Housing',
  visible: false,
  layers: [
    {
      layer: lineStyle('inclusionary-housing-line', 'supporting-zoning', 'inclusionary-housing', 'rgba(227, 142, 48, 1)'),
    },
    {
      layer: fillStyle('inclusionary-housing-fill', 'supporting-zoning', 'inclusionary-housing', 'rgba(227, 142, 48, 1)'),
      highlightable: true,
      tooltipTemplate: '{{{projectnam}}}',
    },
  ],
};
