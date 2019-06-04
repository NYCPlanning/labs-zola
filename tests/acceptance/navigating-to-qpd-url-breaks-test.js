import { module, test } from 'qunit';
import { visit, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import { setupMirage } from 'ember-cli-mirage/test-support';
import refresh from '../helpers/refresh';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | navigating to qpd url breaks', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('Visiting index with QPs directly doesnt break', async function(assert) {
    // this does not work - zoning districts are on
    await visit('/?layer-groups=["building-footprints"%2C"commercial-overlays"%2C"subway"%2C"tax-lots"]');

    assert.ok(true);
  });

  test('Visiting index with QPs of different types doesn not break', async function(assert) {
    await visit('/');
    await click('[data-test-toggle-boroughs]');
    await click('[data-test-toggle-community-districts]');

    await click('[data-test-grouped-parent="Commercial Districts"]');
    await click('[data-test-grouped-parent="Manufacturing Districts"]');
    await click('[data-test-grouped-parent="Residential Districts"]');

    await click('[data-test-about-close-button]');

    await percySnapshot('qp test: visit index, change some things');

    await refresh();

    await percySnapshot('after a refresh, things are applied from previous QPs');

    const boroughs = await find('[data-test-toggle-boroughs] input');
    const cds = await find('[data-test-grouped-parent="Commercial Districts"]');

    assert.equal(boroughs.checked, false);
    assert.equal(cds.checked, false);
  });
});
