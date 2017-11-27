export default {
  id: 'aerials-16',
  title: '2016 Aerials',
  titleTooltip: '2016 Aerial Photos provided by DoITT GIS',
  visible: false,
  meta: {
    description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
    url: ['https://maps.nyc.gov/tiles/'],
    updated_at: 'n/a',
  },
  layers: [
    {
      layer: {
        id: 'aerials-16-raster',
        source: 'aerials-16',
        type: 'raster',
      },
    },
  ],
};
