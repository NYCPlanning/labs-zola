import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | data', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:data');
    assert.ok(route);
  });
});
