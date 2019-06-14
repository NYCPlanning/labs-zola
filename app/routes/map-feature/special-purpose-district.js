import Route from '@ember/routing/route';

export default class SpecialPurposeDistrictRoute extends Route {
  model(params) {
    const { id } = params;

    return {
      id,
    };
  }
}
