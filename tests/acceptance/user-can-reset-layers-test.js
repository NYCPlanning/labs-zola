import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import generateMockCartoGeoJSONResponse from '../helpers/mock-layers-api';

module('Acceptance | user can reset layers', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  generateMockCartoGeoJSONResponse(hooks);

  test('User can reset layers to default state', async function(assert) {
    await visit('/');
    await click('[data-test-toggle-zoning-districts] .layer-group-toggle-label');
    await click('[data-test-toggle-zoning-map-amendments] .layer-group-toggle-label');
    await click('[data-test-reset-query-params="true"]');
    assert.equal(currentURL(), '/about');
  });
});
