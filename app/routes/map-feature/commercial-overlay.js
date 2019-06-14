import Route from '@ember/routing/route';

export default class CommercialOverlayRoute extends Route {
  model(params) {
    const { id } = params;

    return {
      id,
    };
  }
}
