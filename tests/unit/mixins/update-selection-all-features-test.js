import EmberObject from '@ember/object';
import UpdateSelectionAllFeaturesMixin from 'labs-zola/mixins/update-selection-all-features';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection all features', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let UpdateSelectionObject = EmberObject.extend(UpdateSelectionAllFeaturesMixin);
    let subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
