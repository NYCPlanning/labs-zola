import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | layer', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  skip('it exists', function(assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('layer');

    assert.ok(serializer);
  });

  skip('it serializes records', function(assert) {
    const store = this.owner.lookup('service:store');
    const record = store.createRecord('layer', {});

    const serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
