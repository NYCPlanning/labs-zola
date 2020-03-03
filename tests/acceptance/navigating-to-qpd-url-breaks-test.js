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

  test('Visiting index with QPs of different types does not break', async function(assert) {
    await visit('/');

    await click('[data-test-toggle-boroughs] .layer-group-toggle-label'); // this is toggled OFF by default
    await click('[data-test-toggle-community-districts] .layer-group-toggle-label'); // this is toggled OFF by default

    await click('[data-test-grouped-parent="Commercial Districts"]'); // this checkbox is checked by default
    await click('[data-test-grouped-parent="Manufacturing Districts"]'); // this checkbox is checked by default
    await click('[data-test-grouped-parent="Residence Districts"]'); // this checkbox is checked by default

    await click('[data-test-about-close-button]');

    await percySnapshot('qp test: visit index, change some things');

    // the refresh here resets the context, requiring re-mocking
    await refresh();

    await percySnapshot('after a refresh, previous QPs still applies');

    const boroughs = await find('[data-test-toggle-boroughs] input');
    const cds = await find('[data-test-grouped-parent="Commercial Districts"]');

    assert.equal(boroughs.checked, true); // this was turned ON earlier
    assert.equal(cds.checked, false); // this was UNCHECKED earlier
  });
});
