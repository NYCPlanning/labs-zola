export default {
  id: 'sidewalkcafes',
  title: 'Sidewalk Cafes',
  titleTooltip: 'Areas where different types of sidewalk cafes are permitted on public sidewalks',
  visible: false,
  meta: {
    description: 'Sidewalk Cafes release March 2018, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'April 5th, 2018',
  },
  layers: [
    {
      layer: {
        id: 'sidewalkcafes-line-all',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [
              [
                11,
                0.5,
              ],
              [
                13,
                1,
              ],
              [
                15,
                5,
              ],
            ],
          },
          'line-color': '#28AD15',
        },
        filter: [
          'all',
          [
            '==',
            'cafetype',
            'All Cafes',
          ],
        ],
      },
    },
    {
      layer: {
        id: 'sidewalkcafes-line-small',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [
              [
                11,
                0.5,
              ],
              [
                13,
                1,
              ],
              [
                15,
                5,
              ],
            ],
          },
          'line-color': '#CC3DCA',
        },
        filter: [
          'all',
          [
            '==',
            'cafetype',
            'Small Only',
          ],
        ],
        layout: {
          visibility: 'visible',
        },
      },
    },
    {
      layer: {
        id: 'sidewalkcafes-line-unenclosed',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [
              [
                11,
                0.5,
              ],
              [
                13,
                1,
              ],
              [
                15,
                5,
              ],
            ],
          },
          'line-color': '#216BC6',
        },
        filter: [
          'all',
          [
            '==',
            'cafetype',
            'Unenclosed Only',
          ],
        ],
        layout: {
          visibility: 'visible',
        },
      },
    },
  ],
};
