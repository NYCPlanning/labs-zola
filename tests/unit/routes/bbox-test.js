import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { GREATER_NYC_BBOX } from 'labs-zola/routes/bbox';

module('Unit | Route | bbox', function (hooks) {
  setupTest(hooks);

  test('it validates valid bbox in NYC', function (assert) {
    const route = this.owner.lookup('route:bbox');

    assert.ok(route.validateBounds([-73.9978, 40.5705, -73.9804, 40.5785]));
  });

  test('it rejects bbox containing non-number', function (assert) {
    const route = this.owner.lookup('route:bbox');

    assert.notOk(route.validateBounds(['foo', 40.5705, -73.9804, 40.5785]));
  });

  test('it rejects bbox outside greater nyc', function (assert) {
    const route = this.owner.lookup('route:bbox');

    const badBbox = GREATER_NYC_BBOX.map((d) => d - 10);
    assert.notOk(route.validateBounds(badBbox));
  });
});
