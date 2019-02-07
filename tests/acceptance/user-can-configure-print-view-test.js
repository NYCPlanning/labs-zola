import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import setupMapMocks from '../helpers/setup-map-mocks';

module('Acceptance | user can configure print view', function(hooks) {
  setupApplicationTest(hooks);
  setupMapMocks(hooks);

  test('User can click print and configure', async function(assert) {
    await visit('/');
    await click('[data-test-map-print-button]');
    await percySnapshot('default print view');

    await click('[data-test-print-control="landscape"]');
    await click('[data-test-print-control="legal"]');
    await click('[data-test-print-control="legend"]');
    await percySnapshot('arbitrary configured print view');

    await click('[data-test-exit-print]');
    await percySnapshot('exited print view');

    assert.ok(true);
  });
});
