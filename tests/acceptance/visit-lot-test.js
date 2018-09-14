import { currentURL, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | visit lot', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting a lot', async function(assert) {
    await visit('/lot/1/1632/1');

    assert.notEqual(find('.content-area').textContent.length, 0);
  });

  test('visiting a bbl', async function(assert) {
    await visit('/bbl/1001870021');

    assert.equal(currentURL(), '/lot/1/187/21?layer-groups=%5B%22building-footprints%22%2C%22commercial-overlays%22%2C%22subway%22%2C%22tax-lots%22%2C%22zoning-districts%22%5D');
    assert.notEqual(find('.content-area').textContent.length, 0);
  });
});
