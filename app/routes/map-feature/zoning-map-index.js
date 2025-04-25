import Route from '@ember/routing/route';

export default class ZoningMapIndexRoute extends Route {
  async model(params) {
    const { id } = params;

    return {
      id,
      title: id === '30d-Subplan' ? 'SUB PLAN OF 30D' : id,
    };
  }
}
