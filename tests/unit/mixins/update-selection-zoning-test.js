import EmberObject from '@ember/object';
import UpdateSelectionZoningMixin from 'labs-zola/mixins/update-selection-zoning';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let UpdateSelectionObject = EmberObject.extend(UpdateSelectionMixin);
    let subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
