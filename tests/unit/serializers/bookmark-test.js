import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Serializer | bookmark', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it serializes records', function(assert) {
    let record = run(() => this.owner.lookup('service:store').createRecord('bookmark'));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
