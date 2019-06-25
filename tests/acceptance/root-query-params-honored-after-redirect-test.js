import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';
import stubBasicMap from '../helpers/stub-basic-map';

module('Acceptance | root query params honored after redirect', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting site with query params on root are honored after the redirect to about', async function(assert) {
    await visit('/?layer-groups=%5B%22street-centerlines%22%2C%22tax-lots%22%5D');

    assert.equal(currentURL(), '/about?layer-groups=%5B%22street-centerlines%22%2C%22tax-lots%22%5D');
  });

  // I cannot test that the hash works in test suite
  // There's some virtualization going on that's missing location hashes.
  // This should be asserted someday.
  // test('visiting site with map hash honored after redirect', async function(assert) {
  //   await visit('/#15.67/40.753686/-73.984754');

  //   assert.equal(currentURL(), '/about#15.67/40.753686/-73.984754');
  // });
});
