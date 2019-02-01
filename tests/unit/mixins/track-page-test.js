import EmberObject from '@ember/object';
import TrackPageMixin from 'labs-zola/mixins/track-page';
import { module, test } from 'qunit';

module('Unit | Mixin | track page', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const TrackPageObject = EmberObject.extend(TrackPageMixin);
    const subject = TrackPageObject.create();
    assert.ok(subject);
  });
});
