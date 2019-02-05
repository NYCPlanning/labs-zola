import EmberObject from '@ember/object';
import GeometricMixin from 'labs-zola/mixins/geometric';
import { module, test } from 'qunit';

module('Unit | Mixin | geometric', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const GeometricObject = EmberObject.extend(GeometricMixin);
    const subject = GeometricObject.create();
    assert.ok(subject);
  });
});
