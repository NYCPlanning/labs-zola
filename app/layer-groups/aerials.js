export default {
  id: 'aerials',
  title: 'Aerial Imagery',
  titleTooltip: 'Aerial Photos Raster Tiles provided by DoITT GIS',
  visible: false,
  meta: {
    description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
    url: ['https://maps.nyc.gov/tiles/'],
    updated_at: 'n/a',
  },
  layers: [
    {
      displayName: '2016',
      layer: {
        id: 'aerials-2016',
        layout: {
          visibility: 'visible',
        },
        source: 'aerials-2016',
        type: 'raster',
      },
    },
    {
      displayName: '1924',
      layer: {
        id: 'aerials-1924',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-1924',
        type: 'raster',
      },
    },
  ],
};
