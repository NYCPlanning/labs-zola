export default {
  id: 'pluto',
  title: 'Tax Lots',
  titleTooltip: 'A tax lot is a parcel of land identified with a unique borough, block and lot number for property tax purposes.',
  meta: {
    description: 'MapPLUTO™ v16v2, Bytes of the Big Apple',
    url: 'https://www1.nyc.gov/site/planning/data-maps/open-data.page',
    updated_at: 'September 2017',
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
  ],
};
