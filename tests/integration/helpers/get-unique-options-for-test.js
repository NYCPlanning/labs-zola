
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:get-unique-options-for', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('sql', 'SELECT * FROM commercial_overlays_v201810');

    await render(hbs`{{get-unique-options-for 'overlay' sql}}`);

    assert.equal(typeof this, 'object');
  });
});

