import Ember from 'ember';
import GeometricMixin from 'labs-zola/mixins/geometric';
import { module, test } from 'qunit';

module('Unit | Mixin | geometric');

// Replace this with your real tests.
test('it works', function(assert) {
  let GeometricObject = Ember.Object.extend(GeometricMixin);
  let subject = GeometricObject.create();
  assert.ok(subject);
});
