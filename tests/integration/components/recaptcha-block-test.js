import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | recaptcha-block', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows button text', async function(assert) {
    await render(hbs`
      <RecaptchaBlock @buttonText="button text">
        template block text
      </RecaptchaBlock>
    `);

    assert.equal(this.element.textContent.trim(), 'button text');
  });
});
