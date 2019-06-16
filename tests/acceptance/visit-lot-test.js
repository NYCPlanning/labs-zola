import { currentURL, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

// this is a true acceptance, just make sure it works
module('Acceptance | visit lot', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting a lot', async function(assert) {
    await visit('/l/lot/1/1632/1');
    await percySnapshot('lot view');

    assert.notEqual(find('.content-area').textContent.length, 0);
  });

  test('visiting a bbl', async function(assert) {
    await visit('/bbl/1001870021');
    await percySnapshot('lot view');
    assert.equal(currentURL(), '/l/lot/1/187/21?layer-groups=%5B%22building-footprints%22%2C%22commercial-overlays%22%2C%22street-centerlines%22%2C%22subway%22%2C%22tax-lots%22%2C%22zoning-districts%22%5D');
    assert.notEqual(find('.content-area').textContent.length, 0);
  });
});
