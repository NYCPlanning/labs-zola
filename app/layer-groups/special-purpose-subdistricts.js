export default {
  id: 'special-purpose-subdistricts',
  title: 'Special Purpose Subdistricts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'zoning-sp-sd-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'special-purpose-subdistricts',
        paint: {
          'line-width': 2,
          'line-color': 'green',
        },
      },
    },
  ],
};
