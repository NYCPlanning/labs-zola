import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'purple';

export default {
  id: 'scenic-landmarks',
  title: 'Scenic Landmarks',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('scenic-landmarks-line', 'landmark-historic', 'scenic-landmarks', legendColor),
    },
    {
      layer: fillStyle('scenic-landmarks-fill', 'landmark-historic', 'scenic-landmarks', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{scen_lm_na}}}',
    },
  ],
};
