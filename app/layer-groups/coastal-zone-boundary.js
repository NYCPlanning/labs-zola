import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'rgba(124, 159, 238, 1)';
export default {
  id: 'coastal-zone-boundary',
  title: 'Coastal Zone Boundary',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('coastal-zone-boundary-line', 'supporting-zoning', 'coastal-zone-boundary', legendColor),
    },
    {
      layer: fillStyle('coastal-zone-boundary-fill', 'supporting-zoning', 'coastal-zone-boundary', legendColor),
      highlightable: true,
      tooltipTemplate: 'Coastal Zone Boundary',
    },
  ],
};
