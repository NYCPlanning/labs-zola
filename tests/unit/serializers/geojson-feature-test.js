import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | geojson feature', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('carto-geojson-feature');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    const store = this.owner.lookup('service:store');
    const record = store.createRecord('carto-geojson-feature', {});

    const serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
