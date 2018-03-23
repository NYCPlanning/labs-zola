export default {
  id: 'pluto',
  title: 'Tax Lots',
  titleTooltip: 'A tax lot is a parcel of land identified with a unique borough, block and lot number for property tax purposes.',
  meta: {
    description: 'MapPLUTO™ v17v1.1, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '5 March 2018',
  },
  layers: [
    {
      layer: {
        id: 'pluto-fill',
        type: 'fill',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'pluto',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-color': {
            property: 'landuse',
            type: 'categorical',
            stops: [
              ['01', '#FEFFA8'],
              ['02', '#FCB842'],
              ['03', '#B16E00'],
              ['04', '#ff8341'],
              ['05', '#fc2929'],
              ['06', '#E362FB'],
              ['07', '#E0BEEB'],
              ['08', '#44A3D5'],
              ['09', '#78D271'],
              ['10', '#BAB8B6'],
              ['11', '#555555'],
            ],
            default: '#EEEEEE',
          },
          'fill-opacity': 0,
        },
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{address}}',
    },
    {
      layer: {
        id: 'pluto-line',
        type: 'line',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'pluto',
        paint: {
          'line-width': 0.5,
          'line-color': 'rgba(130, 130, 130, 1)',
          'line-opacity': {
            stops: [
              [15, 0],
              [16, 1],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'pluto-labels',
        type: 'symbol',
        source: 'pluto',
        'source-layer': 'pluto',
        minzoom: 15,
        layout: {
          'text-field': '{lot}',
          'text-font': [
            'Open Sans Regular',
            'Arial Unicode MS Regular',
          ],
          'text-size': 11,
        },
        paint: {
          'text-opacity': {
            stops: [
              [
                16.5,
                0,
              ],
              [
                17.5,
                1,
              ],
            ],
          },
          'icon-color': 'rgba(193, 193, 193, 1)',
          'text-color': 'rgba(154, 154, 154, 1)',
          'text-halo-color': 'rgba(152, 152, 152, 0)',
        },
      },
    },
  ],
};
