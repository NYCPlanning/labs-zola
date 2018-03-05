import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'purple';

export default {
  id: 'landmarks',
  title: 'Landmarks',
  titleTooltip: 'Sites designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
  visible: false,
  meta: {
    description: 'Individual Landmarks Shapefile, NYC Open Data Portal',
    url: ['https://data.cityofnewyork.us/Housing-Development/Individual-Landmarks/ch5p-r223/data'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: {
        id: 'landmarks_v0-circle-outline',
        type: 'circle',
        source: 'landmark-historic',
        'source-layer': 'landmarks',
        paint: {
          'circle-radius': { stops: [[10, 3], [15, 7]] },
          'circle-color': '#012700',
          'circle-opacity': 0.7,
        },
      },
    },
    {
      layer: {
        id: 'landmarks_v0-circle',
        type: 'circle',
        source: 'landmark-historic',
        'source-layer': 'landmarks',
        paint: {
          'circle-radius': { stops: [[10, 1], [15, 5]] },
          'circle-color': {
            property: 'lm_type',
            type: 'categorical',
            stops: [
              ['Individual Landmark', 'rgba(147, 245, 201, 1)'],
              ['Interior Landmark', 'rgba(152, 152, 247, 1)'],
            ],
          },
          'circle-opacity': 0.7,
        },
      },
      highlightable: true,
      tooltipTemplate: '{{{lm_name}}}',
    },
    {
      layer: lineStyle('scenic-landmarks-line', 'landmark-historic', 'scenic-landmarks', legendColor),
    },
    {
      layer: fillStyle('scenic-landmarks-fill', 'landmark-historic', 'scenic-landmarks', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{scen_lm_na}}}',
    },
  ],
};
