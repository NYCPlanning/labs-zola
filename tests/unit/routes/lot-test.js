import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Route | lot', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:lot');
    assert.ok(route);
  });

  test('it fetches data', async function (assert) {
    const route = this.owner.lookup('route:lot');

    const { taskInstance } = await route.model({
      boro: 1,
      block: 1,
      lot: 1,
    });

    await taskInstance;

    assert.ok(taskInstance.value);
  });

  test('it retries after a query timeout', async function(assert) {
    let timesCalled = 0;
    assert.expect(4);

    this.server.get('https://planninglabs.carto.com/api/v2/sql', (schema) => {
      assert.ok(true);

      timesCalled += 1;

      if (timesCalled > 3) {
        return schema.lots.first();
      }

      return { errors: ['query_timeout_exceeded'] };
    }, 500);

    const route = this.owner.lookup('route:lot');

    await route.model({
      boro: 1,
      block: 1,
      lot: 1,
    });
  });
});
