import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import Sinon from 'sinon';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';
import stubBasicMap from '../helpers/stub-basic-map';

module('Acceptance | direct load lot disables zoom', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  // setup sinon sandbox
  hooks.before(function() {
    this.sandbox = Sinon.createSandbox();
  });

  // reset sinon
  hooks.afterEach(function() {
    this.sandbox.restore();
  });

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  hooks.beforeEach(function() {
    this.fitBoundsSpy = this.sandbox.spy(this.map, 'fitBounds');
  });

  test('visiting lot', async function(assert) {
    this.server.create('lot', { id: 1000630003 });

    await visit('/l/lot/1/63/3');

    assert.equal(this.fitBoundsSpy.args[0][1].duration, 0);
  });
});
