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
        layout: {
          'line-cap': 'round',
          'line-join': 'miter',
        },
        paint: {
          'line-width': 2,
          'line-color': 'rgba(41, 138, 125, 1)',
          'line-dasharray': [
            1,
            2,
          ],
        },
      },
    },
    {
      layer: {
        id: 'zoning-sp-sd-fill',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'special-purpose-subdistricts',
        paint: {
          'fill-color': 'rgba(67, 156, 146, 1)',
          'fill-opacity': 0.2,
        },
        layout: {
          visibility: 'visible',
        },
      },
      highlightable: true,
      tooltipTemplate: '{{spname}}',
    },
  ],
};
