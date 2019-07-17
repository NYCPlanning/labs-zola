import ApplicationAdapter from './application';
import config from '../config/environment';

const { host, namespace } = config;

export default ApplicationAdapter.extend({
  host,
  namespace,

  async query(store, type, query = {}) {
    const URL = this.buildURL(type.modelName);

    return this.ajax(`${URL}`, 'POST', {
      data: query,
    });
  },
});
