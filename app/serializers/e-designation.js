import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default class EDesignation extends DS.JSONSerializer {
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    let newPayload = payload;
    let newQueryId = queryId;

    console.log('payload', payload);

    if (payload.rows.length) {
      const [feature] = payload.rows;

      const { id } = feature;
      newQueryId = id;

      newPayload = assign(feature, { id });
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
}
