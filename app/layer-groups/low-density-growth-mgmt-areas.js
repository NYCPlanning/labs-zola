import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

const legendColor = 'rgba(255, 127, 0, 1)';

export default {
  id: 'low-density-growth-mgmt-areas',
  title: 'Low Density Growth Management Areas',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  layers: [
    {
      layer: lineStyle('low-density-growth-mgmt-areas-line', 'supporting-zoning', 'low-density-growth-mgmt-areas', legendColor),
    },
    {
      layer: fillStyle('low-density-growth-mgmt-areas-fill', 'supporting-zoning', 'low-density-growth-mgmt-areas', legendColor),
      highlightable: true,
      tooltipTemplate: 'Low Density Growth Management Area',
    },
  ],
};
