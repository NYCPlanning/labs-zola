import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LayerRecordBase extends Component {
  @service
  metrics;

  model = {};

  reCaptchaResponse = null;

  reCaptchaWaiting = false;

  @action
  async captureOutboundLink(label) {
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'External Link',
      eventAction: 'Clicked External Link',
      eventLabel: `Clicked ${label} Link`,
    });
  }

  @action
  onCaptchaResolved(reCaptchaResponse) {
    this.set('reCaptchaResponse', reCaptchaResponse);
    this.set('reCaptchaWaiting', false);
  }

  @action
  resolveCaptcha() {
    this.set('reCaptchaWaiting', true);
    window.grecaptcha.execute();
  }
}
