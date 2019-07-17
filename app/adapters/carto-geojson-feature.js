import config from 'labs-zola/config/environment';
import ApplicationAdapter from './application';

const { carto } = config;

export default ApplicationAdapter.extend({
  host: carto.domain,
  keyForAttribute(key) {
    return key;
  },
  urlForQuery() {
    const baseUrl = this.buildURL();

    return `${baseUrl}/api/v2/sql`;
  },
});
