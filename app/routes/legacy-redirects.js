import Route from '@ember/routing/route';
import window from 'ember-window-mock';

export default class LegacyRedirectsRoute extends Route {
  beforeModel(transition) {
    // preserve the hash which is used to set map pan and zoom
    const { hash } = window.location;

    this.transitionTo(`/l${transition.intent.url}${hash}`);
  }
}
