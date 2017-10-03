export default {
  id: 'pluto',
  title: 'PLUTO (Tax Lots)',
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
          },
          'fill-opacity': 0,
        },
      },
      highlightable: true,
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
  ],
};
