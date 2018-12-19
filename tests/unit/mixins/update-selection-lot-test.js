import EmberObject from '@ember/object';
import UpdateSelectionLotMixin from 'labs-zola/mixins/update-selection-lot';
import { module, test } from 'qunit';

module('Unit | Mixin | update selection lot', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let UpdateSelectionLotObject = EmberObject.extend(UpdateSelectionLotMixin);
    let subject = UpdateSelectionLotObject.create();
    assert.ok(subject);
  });
});
