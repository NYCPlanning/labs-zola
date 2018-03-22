import EmberObject from '@ember/object';
import TrackPageMixin from 'labs-zola/mixins/track-page';
import { module, test } from 'qunit';

module('Unit | Mixin | track page');

// Replace this with your real tests.
test('it works', function(assert) {
  let TrackPageObject = EmberObject.extend(TrackPageMixin);
  let subject = TrackPageObject.create();
  assert.ok(subject);
});
