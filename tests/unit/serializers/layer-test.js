import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | layer', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  skip('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('layer');

    assert.ok(serializer);
  });

  skip('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('layer', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
