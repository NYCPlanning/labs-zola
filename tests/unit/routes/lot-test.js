import { moduleFor, test } from 'ember-qunit';

moduleFor('route:lot', 'Unit | Route | lot', {
  // Specify the other units that are required for this test.
  needs: ['service:main-map', 'service:metrics'],
});

test('it exists', function (assert) {
  const route = this.subject();
  assert.ok(route);
});
