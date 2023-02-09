import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | user can configure print view', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('User can click print and configure', async function(assert) {
    await visit('/');
    await click('[data-test-map-print-button]');
    await click('[data-test-print-control="landscape"]');
    await click('[data-test-print-control="legal"]');
    await click('[data-test-print-control="legend"]');
    await click('[data-test-exit-print]');

    assert.ok(true);
  });
});
