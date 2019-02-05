import EmberObject from '@ember/object';
import UpdateSelectionSingleFeatureMixin from 'labs-zola/mixins/update-selection-single-feature';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection single feature', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const UpdateSelectionObject = EmberObject.extend(UpdateSelectionSingleFeatureMixin);
    const subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
