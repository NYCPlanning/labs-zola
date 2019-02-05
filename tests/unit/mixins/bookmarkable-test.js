import EmberObject from '@ember/object';
import BookmarkableMixin from 'labs-zola/mixins/bookmarkable';
import { module, test } from 'qunit';

module('Unit | Mixin | bookmarkable', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const BookmarkableObject = EmberObject.extend(BookmarkableMixin);
    const subject = BookmarkableObject.create();
    assert.ok(subject);
  });
});
