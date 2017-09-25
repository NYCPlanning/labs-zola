export default {
  id: 'digital-tax-map',
  type: 'raster',
  title: 'Digital Tax Map',
  tiles: ['https://zola-search-api.planninglabs.nyc/tiles/dtm/{z}/{x}/{y}.png'],
  tileSize: 256,
  visible: false,
  minzoom: 15,
  layers: [
    {
      layer: {
        id: 'digitalTaxMa-raster',
        type: 'raster',
        minzoom: 15,
      },
    },
  ],
};
