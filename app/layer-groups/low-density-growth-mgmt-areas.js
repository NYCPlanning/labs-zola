import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#9D47B2';

export default {
  id: 'low-density-growth-mgmt-areas',
  title: 'Lower Density Growth Management Areas',
  titleTooltip: 'Areas where special zoning controls intend to limit growth and better match available infrastructure and services in lower-density areas experiencing rapid development',
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
      tooltipTemplate: 'Lower Density Growth Management Area',
    },
  ],
};
