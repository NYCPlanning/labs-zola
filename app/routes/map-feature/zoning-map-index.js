import Route from '@ember/routing/route';

export default class ZoningMapIndexRoute extends Route {
  model(params) {
    const { id } = params;
    const { search } = this.paramsFor('map-feature');
    return {
      id,
      search,
    };
  }
}
