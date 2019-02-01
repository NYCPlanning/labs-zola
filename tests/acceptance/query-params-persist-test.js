import { module, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | query params persist', function(hooks) {
  setupApplicationTest(hooks);

  skip('visiting /query-params-persist', async function(assert) {
    await visit('/query-params-persist');

    assert.equal(currentURL(), '/query-params-persist');
  });
});
