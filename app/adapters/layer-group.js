import DS from 'ember-data';
import config from '../config/environment';

const { host, namespace } = config;

export default DS.JSONAPIAdapter.extend({
  host,
  namespace,

  async query(store, type, query = {}) {
    const URL = this.buildURL(type.modelName);

    return fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(query),
    }).then(blob => blob.json());
  },
});
