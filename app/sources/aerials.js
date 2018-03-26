const aerials2016 = {
  id: 'aerials-2016',
  type: 'raster',
  tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8'],
  tileSize: 256,
};

const aerials1924 = {
  id: 'aerials-1924',
  type: 'raster',
  tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8'],
  tileSize: 256,
};

export default {
  aerials2016,
  aerials1924,
};
