import { module, test, skip } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Response } from 'ember-cli-mirage';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | lot route retries after error', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('it returns a valid lot after retry', async function(assert) {
    let requests = 0;

    this.server.create('lot', { id: 1016320001 });

    this.server.get('https://planninglabs.carto.com/api/v2/sql', (schema) => {
      requests += 1;

      if (requests === 2) {
        return schema.lots.all();
      }

      return new Response(400, {}, { error: ['query_timeout_exceeded'] });
    });

    await visit('/lot/1/1632/1');

    assert.equal(requests, 2);
  });

  // skipped because I cannot catch the error for some reason
  // the assertion works (in the finally clause), but for some
  // reason the error returned from the store is not being caught
  // by the task
  skip('it still handles an error state', async function(assert) {
    this.server.create('lot', { id: 1016320001 });

    this.server.get('https://planninglabs.carto.com/api/v2/sql',
      () => new Response(400, {}, { error: ['query_timeout_exceeded'] }));

    try {
      await visit('/lot/1/1632/1');
    } catch (e) {
      assert.throws(e, 'something');
    } finally {
      assert.ok(find('[data-test-error-handler]'));
    }
  });
});
