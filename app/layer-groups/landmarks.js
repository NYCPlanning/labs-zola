import { lineStyle, fillStyle } from '../utils/polygon-layer-styles';

const legendColor = 'purple';

export default {
  id: 'landmarks',
  title: 'Landmarks',
  visible: false,
  layers: [
    {
      layer: {
        id: 'landmarkpoints-circle-outline',
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
        id: 'landmarkpoints-circle',
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
