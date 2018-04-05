import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#5E6633';

export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  titleTooltip: 'The regulations for special purpose districts are designed to supplement and modify the underlying zoning in order to respond to distinctive neighborhoods with particular issues and goals',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'April 5th, 2018',
  },
  layers: [
    {
      layer: lineStyle('zoning-sp-line', 'supporting-zoning', 'special-purpose-districts', legendColor),
    },

    {
      layer: fillStyle('zoning-sp-fill', 'supporting-zoning', 'special-purpose-districts', legendColor),
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{sdname}}',
    },
  ],
};
