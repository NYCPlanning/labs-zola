export default {
  id: 'aerials-1951',
  title: '1951 Aerials',
  titleTooltip: '1951 Aerial Photos provided by DoITT GIS',
  visible: false,
  meta: {
    description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
    url: ['https://maps.nyc.gov/tiles/'],
    updated_at: 'n/a',
  },
  layers: [
    {
      layer: {
        id: 'aerials-1951-raster',
        source: 'aerials-1951',
        type: 'raster',
      },
    },
  ],
};
