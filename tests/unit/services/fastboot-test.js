import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | fastboot', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:fastboot');
    assert.ok(service);
  });
});
