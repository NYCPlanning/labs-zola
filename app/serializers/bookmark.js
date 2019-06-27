import LocalStorageSerializer from 'ember-local-storage/serializers/serializer';
import { get } from '@ember/object';

export default LocalStorageSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, ...args) {
    payload.data.forEach((record) => {
      if (record.relationships) {
        if (get(record, 'relationships.bookmark.data.type') === 'zmas') {
          record.relationships.bookmark.data.type = 'zoning-map-amendment';
        }
      }
    });

    return this._super(store, primaryModelClass, payload, ...args);
  },
});
