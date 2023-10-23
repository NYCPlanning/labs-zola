import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | locate-me-mobile', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking on the locate me button removes the locate me mobile feature', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`
      <div class="mapboxgl-ctrl-geolocate"></div>
      {{locate-me-mobile}}
    `);

    const geolocateButton = await find('.mapboxgl-ctrl-geolocate');

    assert.ok(find('[data-test-button="locate-me"]'));

    await click('[data-test-button="locate-me"]');

    assert.ok(!find('[data-test-button="locate-me"]'));
    assert.ok(!find('[data-test-button="dissmis-find-me"]'));
    assert.ok(geolocateButton);
  });
});
