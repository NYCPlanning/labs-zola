import { moduleForModel, test } from 'ember-qunit';

moduleForModel('bookmark', 'Unit | Serializer | bookmark', {
  // Specify the other units that are required for this test.
  needs: ['serializer:bookmark']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
