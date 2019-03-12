import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bbox', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting valid bbox does not redirect', async function(assert) {
    const goodBboxUrl = '-73.9978/40.5705/-73.9804/40.5785';
    await visit(`/bbox/${goodBboxUrl}`);

    assert.equal(currentURL(), `/bbox/${goodBboxUrl}`);
  });

  test('visiting invalid bbox redirects to /about', async function(assert) {
    const badBboxUrl = 'foo/40.5705/-73.9804/40.5785';
    await visit(`/bbox/${badBboxUrl}`);

    assert.equal(currentURL().substring(0, 2), '/?');
  });
});
