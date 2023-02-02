import Route from '@ember/routing/route';
import fetch from 'node-fetch';
import config from 'labs-zola/config/environment';

export default class ZoningDistrictRoute extends Route {
  async model(params) {
    const { id } = params;
    const { search } = this.paramsFor('map-feature');

    try {
      const response = await fetch(`${config.zapApiHost}/projects?action-ulurpnumber[]=${id}`);
      const ulurp = await response.json();
      const zapId = (ulurp.data.length === 1) ? ulurp.data[0].id : null;

      return {
        id,
        search,
        zapId,
      };
    } catch (e) {
      console.error('Could not query ULURP', e); // eslint-disable-line
      return {
        id,
        search,
      };
    }
  }
}
