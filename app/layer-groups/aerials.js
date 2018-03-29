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
      displayName: '2014',
      layer: {
        id: 'aerials-2014',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2014',
        type: 'raster',
      },
    },
    {
      displayName: '2012',
      layer: {
        id: 'aerials-2012',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2012',
        type: 'raster',
      },
    },
    {
      displayName: '2010',
      layer: {
        id: 'aerials-2010',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2010',
        type: 'raster',
      },
    },
    {
      displayName: '2008',
      layer: {
        id: 'aerials-2008',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2008',
        type: 'raster',
      },
    },
    {
      displayName: '2006',
      layer: {
        id: 'aerials-2006',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2006',
        type: 'raster',
      },
    },
    {
      displayName: '2004',
      layer: {
        id: 'aerials-2004',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-2004',
        type: 'raster',
      },
    },
    {
      displayName: '2001-2',
      layer: {
        id: 'aerials-20012',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-20012',
        type: 'raster',
      },
    },
    {
      displayName: '1996',
      layer: {
        id: 'aerials-1996',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-1996',
        type: 'raster',
      },
    },
    {
      displayName: '1951',
      layer: {
        id: 'aerials-1951',
        layout: {
          visibility: 'none',
        },
        source: 'aerials-1951',
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
