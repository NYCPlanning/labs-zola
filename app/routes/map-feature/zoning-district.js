import Route from '@ember/routing/route';

export default class ZoningDistrictRoute extends Route {
  model(params) {
    const { id } = params;

    return {
      id,
    };
  }
}
