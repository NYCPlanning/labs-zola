export default {
  id: 'commercial-overlays',
  title: 'Commercial Overlays',
  type: 'carto',
  sql: 'SELECT * FROM support_zoning_co',
  visible: true,
  layers: [
    {
      layer: {
        id: 'co',
        type: 'fill',
        source: 'co',
        'source-layer': 'layer0',
        paint: {
          'fill-opacity': 1,
          'fill-color': 'rgba(158, 0, 0, 0)',
          'fill-antialias': true,
          'fill-outline-color': 'rgba(255, 0, 0, 1)',
        },
      },
    },
    {
      layer: {
        id: 'co_labels',
        source: 'co',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: {
          'text-color': 'rgba(255, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}',
        },
        minzoom: 14,
      },
    },
  ],
};
