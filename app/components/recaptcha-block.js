import Component from '@ember/component';
import { action } from '@ember/object';
import window from 'ember-window-mock';
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
    if (this.isTestEnvironment) {
      // Do nothing
    } else {
      window.grecaptcha.execute();
    }
  }
}
