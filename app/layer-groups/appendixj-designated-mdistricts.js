import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#F333E1';

export default {
  id: 'appendixj-designated-mdistricts',
  title: 'Appendix J Designated M Districts',
  titleTooltip: 'Designated areas within Manufacturing Districts in which self service storage facilities are subject to certain as-of-right provisions (subarea 1) or are subject to special permit by the City Planning Commission (subarea 2)',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Appendix J Designated M Districts Shapefile',
    url: ['https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM appendixj_designated_mdistricts_v201712&format=SHP'],
    updated_at: '3 May 2018',
  },
  layers: [
    {
      layer: lineStyle('appendixj-designated-mdistricts-line', 'supporting-zoning', 'appendixj-designated-mdistricts', legendColor),
    },

    {
      layer: fillStyle('appendixj-designated-mdistricts-fill', 'supporting-zoning', 'appendixj-designated-mdistricts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{name}}} - Subarea {{{subarea}}}',
    },
  ],
};
