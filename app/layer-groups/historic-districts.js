import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'steelblue';

export default {
  id: 'historic-districts',
  title: 'Historic Districts',
  titleTooltip: 'Areas designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
  visible: false,
  legendIcon: 'polygon',
  legendColor,
  meta: {
    description: 'Historic Districts Shapefile, NYC Open Data Portal',
    url: ['https://data.cityofnewyork.us/Housing-Development/Historic-Districts/xbvj-gfnw/data'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: lineStyle('historic-districts-line', 'landmark-historic', 'historic-districts', legendColor),
    },
    {
      layer: fillStyle('historic-districts-fill', 'landmark-historic', 'historic-districts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{area_name}}}',
    },
  ],
};
