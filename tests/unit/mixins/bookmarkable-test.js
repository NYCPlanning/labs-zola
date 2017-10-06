import Ember from 'ember';
import BookmarkableMixin from 'labs-zola/mixins/bookmarkable';
import { module, test } from 'qunit';

module('Unit | Mixin | bookmarkable');

// Replace this with your real tests.
test('it works', function(assert) {
  let BookmarkableObject = Ember.Object.extend(BookmarkableMixin);
  let subject = BookmarkableObject.create();
  assert.ok(subject);
});
