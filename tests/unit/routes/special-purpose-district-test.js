import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | special purpose district', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:special-purpose-district');
    assert.ok(route);
  });
});
