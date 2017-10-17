import { moduleFor, test } from 'ember-qunit';

moduleFor('route:special-purpose-district', 'Unit | Route | special purpose district', {
  // Specify the other units that are required for this test.
  needs: ['service:mainMap', 'service:metrics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
