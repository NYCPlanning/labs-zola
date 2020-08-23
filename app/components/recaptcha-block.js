import Component from '@ember/component';
import { action } from '@ember/object';
import ENV from '../config/environment';

export default class RecaptchaBlock extends Component {
  isTestEnvironment = ENV.environment === 'test';

  @action
  onCaptchaResolved(reCaptchaResponse) {
    this.set('reCaptchaResponse', reCaptchaResponse);
    this.set('reCaptchaWaiting', false);
  }

  @action
  resolveCaptcha() {
    this.set('reCaptchaWaiting', true);
    const executeRecaptcha = this.isTestEnvironment ? () => {} : window.grecaptcha.execute();
    executeRecaptcha();
  }

  @action
  onCaptchaRendered() {
    this.set('reCaptchaRendered', true);
  }
}
