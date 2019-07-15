import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | zoom-dependent-label', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns correct warning label based on current map zoom', async function(assert) {
    this.mockLayerGroup = {
      layers: [
        {
          style: { minzoom: 4 },
        },
        {
          style: { minzoom: 12 },
        },
        {},
        {
          style: {},
        },
      ],
    };

    await render(hbs`{{zoom-dependent-label this.mockLayerGroup "Warning" 10}}`);

    assert.equal(this.element.textContent.trim(), 'Warning');

    await render(hbs`{{zoom-dependent-label this.mockLayerGroup "Warning" 14}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
