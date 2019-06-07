import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
// import { percySnapshot } from 'ember-percy';
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
    // await percySnapshot('default print view');

    await click('[data-test-print-control="landscape"]');
    await click('[data-test-print-control="legal"]');
    await click('[data-test-print-control="legend"]');
    // await percySnapshot('arbitrary configured print view');

    await click('[data-test-exit-print]');
    // await percySnapshot('exited print view');

    assert.ok(true);
  });
});
