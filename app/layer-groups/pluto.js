export default {
  id: 'pluto',
  title: 'PLUTO (Tax Lots)',
  sql: 'SELECT the_geom_webmercator, bbl, address FROM support_mappluto',
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
          'fill-opacity': 0,
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
