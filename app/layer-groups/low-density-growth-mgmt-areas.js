import { lineStyle, fillStyle } from '../helpers/polygon-layer-styles';

export default {
  id: 'low-density-growth-mgmt-areas',
  title: 'Low Density Growth Management Areas',
  visible: false,
  layers: [
    {
      layer: lineStyle('low-density-growth-mgmt-areas-line', 'supporting-zoning', 'low-density-growth-mgmt-areas', 'rgba(255, 127, 0, 1)'),
    },
    {
      layer: fillStyle('low-density-growth-mgmt-areas-fill', 'supporting-zoning', 'low-density-growth-mgmt-areas', 'rgba(255, 127, 0, 1)'),
      highlightable: true,
      tooltipTemplate: 'Low Density Growth Management Area',
    },
  ],
};
