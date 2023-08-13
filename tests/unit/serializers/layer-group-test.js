import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | layer group', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('layer-group');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    const store = this.owner.lookup('service:store');
    const record = store.createRecord('layer-group', {});

    const serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
