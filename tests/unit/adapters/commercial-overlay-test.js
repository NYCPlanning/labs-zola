import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | commercial overlay', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:commercial-overlay');
    assert.ok(adapter);
  });
});
