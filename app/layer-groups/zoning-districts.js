export default {
  id: 'zoning-districts',
  title: 'Zoning Districts',
  visible: true,
  titleTooltip: 'A zoning district is a residential, commercial or manufac­turing area of the city within which zoning regulations govern land use and building bulk.',
  meta: {
    description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'April 5th, 2018',
  },
  layers: [
    {
      layer: {
        id: 'zd-fill',
        type: 'fill',
        source: 'zoning-districts',
        'source-layer': 'zoning-districts',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [
              ['BP', '#808080'],
              ['C1', '#ffa89c'],
              ['C2', '#fd9a8f'],
              ['C3', '#fa867c'],
              ['C4', '#f76e67'],
              ['C5', '#f2544e'],
              ['C6', '#ee3a36'],
              ['C7', '#ea2220'],
              ['C8', '#e50000'],
              ['M1', '#f3b3ff'],
              ['M2', '#e187f3'],
              ['M3', '#cf5ce6'],
              ['PA', '#78D271'],
              ['R1', '#fff8a6'],
              ['R2', '#fff7a6'],
              ['R3', '#fff797'],
              ['R4', '#fff584'],
              ['R5', '#fff36c'],
              ['R6', '#fff153'],
              ['R7', '#ffee39'],
              ['R8', '#ffec22'],
              ['R9', '#ffeb0e'],
              ['R10', '#ffea00'],
            ],
          },
          'fill-opacity': {
            stops: [
              [15, 0.3],
              [16, 0],
            ],
          },
          'fill-antialias': true,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: 'Zoning District {{zonedist}}',
    },
    {
      layer: {
        id: 'zd-lines',
        type: 'line',
        source: 'zoning-districts',
        'source-layer': 'zoning-districts',
        paint: {
          'line-opacity': {
            stops: [
              [12, 0],
              [13, 0.2],
              [16, 0.5],
            ],
          },
          'line-width': {
            stops: [
              [13, 1],
              [14, 3],
            ],
          },
        },
      },
      before: 'place_other',
    },
    {
      layer: {
        id: 'zd_labels',
        source: 'zoning-districts',
        type: 'symbol',
        'source-layer': 'zoning-districts',
        paint: {
          'text-color': {
            stops: [
              [15, '#626262'],
              [16, '#444'],
            ],
          },
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': {
            stops: [
              [12, 0],
              [13, 1],
            ],
          },
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{zonedist}',
          'text-size': {
            stops: [
              [
                10,
                8,
              ],
              [
                14,
                16,
              ],
            ],
          },
        },
      },
    },
  ],
};
