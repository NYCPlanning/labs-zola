import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | recaptcha-block', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('its actions update its args', function(assert) {
    const component = this.owner.factoryFor('component:recaptcha-block').create();

    // reCaptchaRendered starts off undefined
    let reCaptchaRendered = component.get('reCaptchaResponse');
    assert.equal(reCaptchaRendered, undefined);

    // reCaptchaRendered gets set to true when onCaptchaRendered is fired
    component.onCaptchaRendered();
    reCaptchaRendered = component.get('reCaptchaRendered');
    assert.equal(reCaptchaRendered, true);

    // reCaptchaResponse starts off undefined
    let reCaptchaResponse = component.get('reCaptchaResponse');
    assert.equal(reCaptchaResponse, undefined);

    // Fake resolving the reCAPTCHA, which fires the onCaptchaResolved action
    component.onCaptchaResolved('1234567890ABCDEFGHIJ');
    reCaptchaResponse = component.get('reCaptchaResponse');
    assert.equal(reCaptchaResponse, '1234567890ABCDEFGHIJ');
  });
});
