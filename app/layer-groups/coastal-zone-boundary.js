import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#5DC6E4';

export default {
  id: 'coastal-zone-boundary',
  title: 'Coastal Zone Boundary',
  titleTooltip: 'Projects within the coastal zone boundary are subject to additional review under the Waterfront Revitalization Program',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'WRP Coastal Zone Boundary v2016.1, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'September 2017',
  },
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
