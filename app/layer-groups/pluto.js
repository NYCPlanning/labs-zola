export default {
  id: 'pluto',
  title: 'PLUTO (Tax Lots)',
  sql: 'SELECT the_geom_webmercator, bbl, landuse, address FROM support_mappluto',
  minzoom: 12,
  type: 'carto',
  layers: [
    {
      layer: {
        id: 'pluto-fill',
        type: 'fill',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'layer0',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-color': {
            property: 'landuse',
            type: 'categorical',
            stops: [
              ['01', '#f4f455'],
              ['02', '#f7d496'],
              ['03', '#FF9900'],
              ['04', '#f7cabf'],
              ['05', '#ea6661'],
              ['06', '#d36ff4'],
              ['07', '#dac0e8'],
              ['08', '#5CA2D1'],
              ['09', '#8ece7c'],
              ['10', '#bab8b6'],
              ['11', '#5f5f60'],
            ],
          },
          'fill-opacity': 0.2,
        },
      },
    },
    {
      layer: {
        id: 'pluto-line',
        type: 'line',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'layer0',
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
