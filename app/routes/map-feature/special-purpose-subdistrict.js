import Route from '@ember/routing/route';

export default class specialPurposeSubdistrictRoute extends Route {
  model(params) {
    const { id } = params;

    return {
      id,
    };
  }
}
