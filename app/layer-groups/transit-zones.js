import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#E6D62E';

export default {
  id: 'transit-zones',
  title: 'Transit Zones',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  titleTooltip: 'Transit-accessible areas where parking is optional for new affordable housing units and special rules apply to existing affordable units',
  meta: {
    description: 'Transit Zones release July 2016, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'September 2017',
  },
  layers: [
    {
      layer: lineStyle('transit-zones-line', 'supporting-zoning', 'transit-zones', legendColor),
    },
    {
      layer: fillStyle('transit-zones-fill', 'supporting-zoning', 'transit-zones', legendColor),
      highlightable: true,
      tooltipTemplate: 'Transit Zone',
    },
  ],
};
