import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from 'labs-zola/mirage/static-fixtures/layer-groups';

module('Acceptance | legacy redirect', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting a non-namespaced URL redirects', async function(assert) {
    this.server.create('lot', { id: 1000163201 });
    await visit('/lot/1/1632/1');

    assert.ok(currentURL().includes('/l/lot/1/1632/1'));
  });
});
