import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#2B0A76';

export default {
  id: 'industrial-business-zones',
  title: 'Industrial Business Zones',
  titleTooltip: 'Industrial Business Zones (IBZs) are areas where expanded business services are available for industrial and manufacturing businesses. This designation fosters high-performing business districts by creating competitive advantages over locating in areas outside of New York City.',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Business Improvement Districts Shapefile on nycedc.com',
    url: ['https://www.nycedc.com/industry/industrial/nyc-industrial-business-zones'],
    updated_at: '2 May 2018',
  },
  layers: [
    {
      layer: lineStyle('industrial-business-zones-line', 'supporting-zoning', 'industrial-business-zones', legendColor),
    },

    {
      layer: fillStyle('industrial-business-zones-fill', 'supporting-zoning', 'industrial-business-zones', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{name}}} IBZ',
    },
  ],
};
