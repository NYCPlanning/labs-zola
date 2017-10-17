import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:bookmarks', 'Unit | Controller | bookmarks', {
  // Specify the other units that are required for this test.
  needs: ['service:mainMap', 'service:metrics']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
