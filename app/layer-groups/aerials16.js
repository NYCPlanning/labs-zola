export default {
  id: 'aerials16',
  type: 'raster',
  title: '2016 Aerials',
  tiles: ['https://api.capitalplanning.nyc/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png'],
  tileSize: 256,
  maxzoom: 14,
  visible: false,
  layers: [
    {
      layer: {
        id: 'landuse-raster',
        type: 'raster',
        source: 'aerials16',
      },
      before: 'zd',
    },
  ],
};
