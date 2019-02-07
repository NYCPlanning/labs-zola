import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | user can configure print view', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /user-can-configure-print-view', async function(assert) {
    await visit('/user-can-configure-print-view');

    assert.equal(currentURL(), '/user-can-configure-print-view');
  });
});
