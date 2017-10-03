export default {
  id: 'digital-tax-map',
  title: 'Digital Tax Map',
  visible: false,
  layers: [
    {
      layer: {
        id: 'digital-tax-map-raster',
        source: 'digital-tax-map',
        type: 'raster',
        minzoom: 15,
      },
    },
  ],
};
