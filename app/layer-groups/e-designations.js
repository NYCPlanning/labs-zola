export default {
  id: 'e-designations',
  title: 'Environmental Designations',
  titleTooltip: 'An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot.',
  meta: {
    description: 'NYC DCP E-Designations CSV updated 10/13/2017, geocoded on 11/9/2017',
    url: ['https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM e_designations&format=SHP&filename=e_designations'],
    updated_at: 'December 27, 2017',
  },
  visible: false,
  layers: [
    {
      layer: {
        id: 'e-designations-circle',
        type: 'circle',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        minzoom: 15,
        paint: {
          'circle-radius': {
            stops: [
              [
                16,
                2,
              ],
              [
                17,
                5,
              ],
            ],
          },
          'circle-color': 'rgba(255, 255, 255, 0.65)',
          'circle-stroke-opacity': {
            stops: [
              [
                15,
                0,
              ],
              [
                16,
                1,
              ],
            ],
          },
          'circle-stroke-color': 'rgba(52, 33, 220, 1)',
          'circle-pitch-scale': 'map',
          'circle-stroke-width': 1.5,
          'circle-opacity': 1,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: 'E-designation<br/>CEQR: {{ceqr_num}}<br/>ULURP: {{ulurp_num}}',
    },
    {
      layer: {
        id: 'e-designations-label',
        type: 'symbol',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        minzoom: 16,
        layout: {
          'text-field': 'E',
          'text-size': 8,
          'text-allow-overlap': true,
          visibility: 'visible',
        },
        paint: {
          'text-opacity': {
            stops: [
              [
                16,
                0,
              ],
              [
                17,
                1,
              ],
            ],
          },
        },
      },
    },
  ],
};
