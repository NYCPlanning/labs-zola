import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

// this behavior is already tested in an acceptance test
module('Integration | Component | map-resource-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MapResourceSearch />`);

    assert.ok(true);
  });
});
