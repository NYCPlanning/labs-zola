import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#9D47B2';

export default {
  id: 'low-density-growth-mgmt-areas',
  title: 'Low Density Growth Management Areas',
  titleTooltip: 'These districts aim to match future development to the capacity of supporting services and infrastructure in parts of the city experiencing rapid growth.',
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
