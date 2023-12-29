import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { MAPBOX_GL_DEFAULTS } from '../../helpers/stub-basic-map';

module('Integration | Component | map-measurement-tools', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.map = {
      ...MAPBOX_GL_DEFAULTS,
    };

    // Template block usage:
    await render(hbs`
      <MapMeasurementTools @map={{this.map}}>
        template block text
      </MapMeasurementTools>
    `);

    assert.ok(this.element);
  });
});
