import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | sanitize', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', { color: 'purple' });

    await render(hbs`{{sanitize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'color:purple;');
  });
});
