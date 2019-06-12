import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | map-feature/commercial-overlay', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:map-feature/commercial-overlay');
    assert.ok(route);
  });
});
