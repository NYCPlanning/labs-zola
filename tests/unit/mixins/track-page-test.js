import Ember from 'ember';
import TrackPageMixin from 'labs-zola/mixins/track-page';
import { module, test } from 'qunit';

module('Unit | Mixin | track page');

// Replace this with your real tests.
test('it works', function(assert) {
  let TrackPageObject = Ember.Object.extend(TrackPageMixin);
  let subject = TrackPageObject.create();
  assert.ok(subject);
});
