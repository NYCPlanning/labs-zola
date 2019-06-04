import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    const [feature] = payload.features;
    const { id } = feature.properties;
    const { geometry } = feature;
    const json = assign(feature.properties, { id, geometry });

    return this._super(store,
      primaryModelClass,
      json,
      id,
      requestType);
  },
});
