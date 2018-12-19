import EmberObject from '@ember/object';
import UpdateSelectionZoningMixin from 'labs-zola/mixins/update-selection-zoning';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection zoning', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let UpdateSelectionZoningObject = EmberObject.extend(UpdateSelectionZoningMixin);
    let subject = UpdateSelectionZoningObject.create();
    assert.ok(subject);
  });
});
