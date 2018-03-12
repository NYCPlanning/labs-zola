import Ember from 'ember';
import UpdateSelectionMixin from 'labs-zola/mixins/update-selection';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection');

// Replace this with your real tests.
test('it works', function(assert) {
  let UpdateSelectionObject = Ember.Object.extend(UpdateSelectionMixin);
  let subject = UpdateSelectionObject.create();
  assert.ok(subject);
});
