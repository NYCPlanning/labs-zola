import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | navigating to qpd url breaks', function(hooks) {
  setupApplicationTest(hooks);

  test('Visiting index with QPs directly doesnt break', async function(assert) {
    await visit('/?layer-groups=["building-footprints"%2C"commercial-overlays"%2C"subway"%2C"tax-lots"%2C"zoning-districts"]');

    assert.ok(true);
  });
});
