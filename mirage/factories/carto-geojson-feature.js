import { Factory } from 'miragejs';

const SQUARE_POLYGON = {
  type: 'Polygon',
  coordinates: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
      [0, 0],
    ],
  ],
};

export default Factory.extend({
  type: 'Feature',
  geometry: SQUARE_POLYGON,
  properties: {},
  afterCreate(lot) {
    lot.update('properties', {
      ...lot.properties,
      ...{
        id: lot.id,
      },
    });
  },
});
