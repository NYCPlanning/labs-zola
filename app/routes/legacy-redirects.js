import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import window from 'ember-window-mock';

export default class LegacyRedirectsRoute extends Route {
  @service
  fastboot;

  beforeModel(transition) {
    if (!this.fastboot.isFastBoot) {
      // preserve the hash which is used to set map pan and zoom
      const { hash } = window.location;

      this.transitionTo(`/l${transition.intent.url}${hash}`);
    }
  }
}
