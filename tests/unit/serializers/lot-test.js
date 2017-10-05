import { moduleForModel, test } from 'ember-qunit';

moduleForModel('lot', 'Unit | Serializer | lot', {
  // Specify the other units that are required for this test.
  needs: ['serializer:lot', 'model:bookmark', 'model:zma']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
