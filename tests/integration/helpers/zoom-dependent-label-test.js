import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | zoom-dependent-label', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns correct warning label based on current map zoom', async function (assert) {
    const store = this.owner.lookup('service:store');
    const mockLayerGroup = store.createRecord('layer-group', {
      layers: [
        store.createRecord('layer', {
          style: { minzoom: 12 },
        }),
        store.createRecord('layer', {
          style: { minzoom: 13 },
        }),
      ],
    });
    this.set('mockLayerGroup', mockLayerGroup);

    await render(
      hbs`{{zoom-dependent-label this.mockLayerGroup "Warning" 10}}`
    );

    assert.equal(this.element.textContent.trim(), 'Warning');

    await render(
      hbs`{{zoom-dependent-label this.mockLayerGroup "Warning" 14}}`
    );

    assert.equal(this.element.textContent.trim(), '');
  });
});
