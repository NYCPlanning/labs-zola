import Route from '@ember/routing/route';

export default class LegacyRedirectsRoute extends Route {
  beforeModel(transition) {
    this.transitionTo(`/l${transition.intent.url}`);
  }
}
