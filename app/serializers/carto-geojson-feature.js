import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default class GeoJsonFeatureSerializer extends DS.JSONSerializer {
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

  extractErrors(store, typeClass, payload) {
    if (payload && typeof payload === 'object' && payload.error) {
      payload = payload.error;
      this.normalizeErrors(typeClass, payload);
    }

    return payload;
  }
}
