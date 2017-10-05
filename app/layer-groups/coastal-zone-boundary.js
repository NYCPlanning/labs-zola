import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'coastal-zone-boundary',
  title: 'Coastal Zone Boundary',
  visible: false,
  layers: [
    {
      layer: lineStyle('coastal-zone-boundary-line', 'supporting-zoning', 'coastal-zone-boundary', 'rgba(124, 159, 238, 1)'),
    },
    {
      layer: fillStyle('coastal-zone-boundary-fill', 'supporting-zoning', 'coastal-zone-boundary', 'rgba(124, 159, 238, 1)'),
      highlightable: true,
      tooltipTemplate: 'Coastal Zone Boundary',
    },
  ],
};
