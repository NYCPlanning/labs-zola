import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = '#76420a';

export default {
  id: 'limited-height-districts',
  title: 'Limited Height Districts',
  titleTooltip: 'A limited height district may be superimposed on an area designated as an historic district by the Landmarks Preservation Commission. It is mapped in areas of the Upper East Side, Gramercy Park, Brooklyn Heights and Cobble Hill. The maximum building height is 50 feet in a LH-1 district, 60 feet in a LH-1A district, 70 feet in a LH-2 district and 100 feet in a LH-3 district.',
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
      layer: lineStyle('limited-height-districts-line', 'supporting-zoning', 'limited-height-districts', legendColor),
    },

    {
      layer: fillStyle('limited-height-districts-fill', 'supporting-zoning', 'limited-height-districts', legendColor),
      highlightable: true,
      tooltipTemplate: 'Limited height district - {{lhlbl}}',
    },
  ],
};
