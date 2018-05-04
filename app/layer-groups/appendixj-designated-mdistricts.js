import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#8ff442';

export default {
  id: 'appendixj-designated-mdistricts',
  title: 'Industrial Business Zones',
  titleTooltip: 'Industrial Business Zones (IBZs) are areas where expanded business services are available for industrial and manufacturing businesses. This designation fosters high-performing business districts by creating competitive advantages over locating in areas outside of New York City.',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Appendix J Designated M Districts Shapefile',
    url: ['https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM appendixj_designated_mdistricts_v20180503&format=SHP'],
    updated_at: '3 May 2018',
  },
  layers: [
    {
      layer: lineStyle('appendixj-designated-mdistricts-line', 'supporting-zoning', 'appendixj-designated-mdistricts', legendColor),
    },

    {
      layer: fillStyle('appendixj-designated-mdistricts-fill', 'supporting-zoning', 'appendixj-designated-mdistricts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{name}}} IBZ',
    },
  ],
};
