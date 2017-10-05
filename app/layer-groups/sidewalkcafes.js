export default {
  id: 'sidewalkcafes',
  title: 'Sidewalk Cafes',
  visible: false,
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
          'line-color': 'rgba(40, 173, 21, 1)',
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
          'line-color': 'rgba(198, 33, 196, 1)',
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
          'line-color': 'rgba(33, 107, 198, 1)',
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
