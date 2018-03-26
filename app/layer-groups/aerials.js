export default {
  id: 'aerials',
  title: 'Aerial Imagery',
  titleTooltip: 'Aerial Photos Raster Tiles provided by DoITT GIS',
  visible: true,
  meta: {
    description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
    url: ['https://maps.nyc.gov/tiles/'],
    updated_at: 'n/a',
  },
  layers: [
    {
      layer: {
        id: 'aerials-2016-raster',
        source: 'aerials-2016',
        type: 'raster',
      },
    },
    {
      layer: {
        id: 'aerials-1924-raster',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-1924',
        type: 'raster',
      },
    },
  ],
};
