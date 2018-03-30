export default {
  id: 'threed-buildings',
  title: '3D Buildings',
  titleTooltip: 'Extruded building height from OpenStreetMap data',
  visible: false,
  meta: {
    description: 'OpenStreetMap Building Footprints via Mapbox Vector Tile Service',
    url: ['https://www.openstreetmap.org/'],
    updated_at: null,
  },
  layers: [
    {
      layer: {
        id: 'threed-buildings',
        type: 'fill-extrusion',
        source: 'openmaptiles',
        'source-layer': 'building',
        minzoom: 0,
        paint: {
          'fill-extrusion-color': 'rgba(203, 203, 203, 1)',
          'fill-extrusion-opacity': 0.95,
          'fill-extrusion-translate': [
            3,
            0,
          ],
          'fill-extrusion-height': {
            property: 'render_height',
            type: 'identity',
          },
          'fill-extrusion-base': {
            property: 'render_min_height',
            type: 'identity',
          },
        },
      },
    },
  ],
};
