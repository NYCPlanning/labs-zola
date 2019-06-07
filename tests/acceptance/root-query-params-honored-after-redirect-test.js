import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | root query params honored after redirect', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting site with query params on root are honored after the redirect to about', async function(assert) {
    await visit('/?layer-groups=%5B%22street-centerlines%22%2C%22tax-lots%22%5D');

    assert.equal(currentURL(), '/about?layer-groups=%5B%22street-centerlines%22%2C%22tax-lots%22%5D');
  });
});
