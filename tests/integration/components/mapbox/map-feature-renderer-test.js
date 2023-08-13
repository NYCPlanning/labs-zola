import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

class MainMapService extends Service {
  selected = {};

  setFitBounds = {
    perform() {},
  };

  setBounds = {
    perform() {},
  };
}

module(
  'Integration | Component | mapbox/map-feature-renderer',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      this.owner.register('service:main-map', MainMapService);

      this.model = {};

      await render(hbs`
      {{mapbox/map-feature-renderer
        model=this.model
      }}`);

      assert.equal(this.element.textContent.trim(), '');
    });
  }
);
