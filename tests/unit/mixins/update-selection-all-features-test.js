import EmberObject from '@ember/object';
import UpdateSelectionSingleFeaturesMixin from 'labs-zola/mixins/update-selection-single-features';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection single features', function() {
  test('it works', function(assert) {
    let UpdateSelectionObject = EmberObject.extend(UpdateSelectionSingleFeaturesMixin);
    let subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
