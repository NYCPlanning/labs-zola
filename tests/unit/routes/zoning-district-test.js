import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | zoning-district', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:zoning-district');
    assert.ok(route);
  });
});
