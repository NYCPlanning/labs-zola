import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../../config/environment';

export default class LayerRecordBase extends Component {
  @service
  metrics;

  isTestEnvironment = ENV.environment === 'test';

  model = {};

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

  @action
  onCaptchaRendered() {
    this.set('reCaptchaRendered', true);
  }
}
