import DS from 'ember-data';
import Ember from 'ember';

const { merge } = Ember;

export default DS.JSONSerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    const [feature] = payload.features;
    const { id, geometry } = feature.properties;
    const json = merge(feature.properties, { id, geometry });

    return this._super(store,
      primaryModelClass,
      json,
      id,
      requestType);
  },
});
