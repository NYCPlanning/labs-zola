export default {
  id: 'threed-buildings',
  title: '3D Buildings',
  titleTooltip: 'Extruded building height from OpenStreetMap data',
  visible: false,
  meta: {
    description: 'OpenStreetMap Building Footprints via Mapbox Vector Tile Service',
    url: 'https://www.openstreetmap.org/',
    updated_at: null,
  },
  layers: [
    {
      layer: {
        id: 'threed-buildings',
        type: 'fill-extrusion',
        source: 'composite',
        'source-layer': 'building',
        minzoom: 0,
        filter: ['all', ['==', 'extrude', 'true']],
        paint: {
          'fill-extrusion-height': {
            type: 'identity',
            property: 'height',
          },
          'fill-extrusion-base': {
            type: 'identity',
            property: 'min_height',
          },
          'fill-extrusion-color': 'rgba(179, 179, 179, 1)',
          'fill-extrusion-opacity': 0.6,
          'fill-extrusion-translate': [3, 0],
        },
        layout: {
          visibility: 'visible',
        },
      },
    },
  ],
};
