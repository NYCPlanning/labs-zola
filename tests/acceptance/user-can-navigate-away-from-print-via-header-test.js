import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | user can navigate away from print via header', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('user can navigate away from print via header', async function(assert) {
    // if you visit the site
    await visit('/');

    // when you click print, then click back
    await click('[data-test-map-print-button=""]');

    await click('[data-test-link-to="index"]');

    // then the site still works!
    assert.ok(true);
  });
});
