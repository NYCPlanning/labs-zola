import EmberObject from '@ember/object';
import UpdateSelectionSingleFeatureMixin from 'labs-zola/mixins/update-selection-single-feature';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection single feature', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let UpdateSelectionObject = EmberObject.extend(UpdateSelectionSingleFeatureMixin);
    let subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
