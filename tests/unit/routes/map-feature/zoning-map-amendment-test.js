import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | map-feature/zoning-map-amendment', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:map-feature/zoning-map-amendment');
    assert.ok(route);
  });
});
