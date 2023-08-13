import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | lot', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:map-feature/lot');
    assert.ok(route);
  });
});
