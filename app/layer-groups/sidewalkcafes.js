export default {
  id: 'sidewalkcafes',
  title: 'Sidewalk Cafes',
  titleTooltip: 'A sidewalk cafe is a portion of an eating or drinking estab­lishment that is located on a public sidewalk. Sidewalk cafe regulations are administered by the Department of Consumer Affairs.',
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
