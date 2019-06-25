import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default class GeoJsonFeatureSerializer extends DS.JSONSerializer {
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    let newPayload = payload;
    let newQueryId = queryId;

    if (payload.features.length) {
      const [feature] = payload.features;

      const { id } = feature.properties;
      newQueryId = id;

      const { geometry } = feature;
      newPayload = assign(feature, { id, geometry });
    } else {
      throw new Error(`cannot find record ${queryId} for ${primaryModelClass}`);
    }

    return super.normalizeFindRecordResponse(
      store,
      primaryModelClass,
      newPayload,
      newQueryId,
      requestType,
    );
  }

  normalizeQueryResponse(store, primaryModelClass, payload, ...etc) {
    const { features } = payload;

    features.forEach((feature) => {
      const { id } = feature.properties;
      const { geometry } = feature;
      assign(feature, { id, geometry });
    });

    return super.normalizeQueryResponse(
      store,
      primaryModelClass,
      features,
      ...etc,
    );
  }
}
