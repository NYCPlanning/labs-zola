import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:special-purpose-subdistrict', 'Unit | Adapter | special purpose subdistrict', {
  // Specify the other units that are required for this test.
  needs: ['service:mainMap']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
