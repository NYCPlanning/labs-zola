export default {
  id: 'zoning-map-amendments-pending',
  title: 'Pending Zoning Map Amendments',
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, ulurpno, status FROM support_nyzma WHERE status = \'Certified\''],
  visible: false,
  layers: [
    {
      layer: {
        id: 'zmacert-line',
        type: 'line',
        source: 'zma',
        'source-layer': 'layer0',
        paint: {
          'line-width': {
            stops: [
              [11, 1],
              [12, 3],
            ],
          },
          'line-color': 'gray',
          'line-dasharray': [1, 1],
          'line-opacity': 0.6,
        },
      },
    },
    {
      layer: {
        id: 'zmacert-fill',
        type: 'fill',
        'source-layer': 'layer0',
        paint: {
          'fill-color': '#B01F1F',
          'fill-opacity': 0.6,
        },
      },
    },
  ],
};
