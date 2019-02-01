
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:bbl-demux', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', { boro: 4, block: 4381, lot: 1 });

    await render(hbs`{{bbl-demux inputValue}}`);

    assert.equal(find('*').textContent.trim(), '4043810001');
  });
});
