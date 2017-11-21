import { moduleFor, test } from 'ember-qunit';

moduleFor('route:commercial-overlay', 'Unit | Route | commercial overlay', {
  // Specify the other units that are required for this test.
  needs: ['service:metrics', 'service:mainMap']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
