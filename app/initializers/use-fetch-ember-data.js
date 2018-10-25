import DS from 'ember-data';
import fetch from 'fetch';

const { JSONAPIAdapter } = DS;

export function initialize(/* application */) {
  JSONAPIAdapter.reopen({
    findRecord(store, type, id, snapshot) {
      const url = this.buildURL(type.modelName, id, snapshot, 'findRecord');

      return fetch(url).then(blob => blob.json());
    },
  });
}

export default {
  initialize,
};
