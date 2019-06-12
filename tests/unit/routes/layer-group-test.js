import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | layer-group', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:layer-group');
    assert.ok(route);
  });
});
