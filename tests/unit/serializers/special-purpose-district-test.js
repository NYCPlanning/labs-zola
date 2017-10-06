import { moduleForModel, test } from 'ember-qunit';

moduleForModel('special-purpose-district', 'Unit | Serializer | special purpose district', {
  // Specify the other units that are required for this test.
  needs: ['serializer:special-purpose-district']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
