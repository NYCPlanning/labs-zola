import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | home-page', function(hooks) {
  setup(hooks);

  test('it renders the index page', async function(assert) {
    await visit('/about');

    assert.ok(true);
  });
});
