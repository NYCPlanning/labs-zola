export default {
  id: 'special-purpose-districts',
  title: 'Special Purpose Districts',
  visible: false,
  layers: [
    {
      layer: {
        id: 'zoning-sp-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'special-purpose-districts',
        paint: {
          'line-width': 2,
          'line-color': 'rgba(61, 66, 210, 1)',
          'line-dasharray': [1, 2],
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'miter',
        },
      },
    },

    {
      layer: {
        id: 'zoning-sp-fill',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'special-purpose-districts',
        paint: {
          'fill-color': 'rgba(101, 124, 230, 1)',
          'fill-opacity': 0.2,
        },
        layout: {},
      },
      highlightable: true,
      tooltipTemplate: '{{sdname}}',
    },
  ],
};
