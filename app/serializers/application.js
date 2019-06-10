import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    let newPayload = payload;
    let newQueryId = queryId;

    if (payload.features) {
      const [feature] = payload.features;

      const { id } = feature.properties;
      newQueryId = id;

      const { geometry } = feature;
      newPayload = assign(feature.properties, { id, geometry });
    }

    return this._super(store,
      primaryModelClass,
      newPayload,
      newQueryId,
      requestType);
  },
});
