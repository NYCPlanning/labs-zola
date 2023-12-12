import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | map-feature/special-purpose-subdistrict',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const route = this.owner.lookup(
        'route:map-feature/special-purpose-subdistrict'
      );
      assert.ok(route);
    });
  }
);
