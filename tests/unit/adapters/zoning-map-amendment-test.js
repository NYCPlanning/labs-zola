import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | zoning-map-amendment', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const adapter = this.owner.lookup('adapter:zoning-map-amendment');
    assert.ok(adapter);
  });
});
