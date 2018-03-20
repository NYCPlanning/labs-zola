export default {
  id: 'aerials-1996',
  title: '1996 Aerials',
  titleTooltip: '1996 Aerial Photos provided by DoITT GIS',
  visible: false,
  meta: {
    description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
    url: ['https://maps.nyc.gov/tiles/'],
    updated_at: 'n/a',
  },
  layers: [
    {
      layer: {
        id: 'aerials-1996-raster',
        source: 'aerials-1996',
        type: 'raster',
      },
    },
  ],
};
