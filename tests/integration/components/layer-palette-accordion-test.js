import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layer palette accordion', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{layer-palette-accordion}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#layer-palette-accordion}}
        template block text
      {{/layer-palette-accordion}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('count number of visible layer-menu-item child descendents, updates', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('fakeLayerVisible', {
      visible: true,
    });

    this.set('fakeLayerInvisible', {
      visible: false,
    });

    // Template block usage:
    await render(hbs`
      {{#layer-palette-accordion}}
        {{layer-menu-item layer=fakeLayerVisible}}
        {{layer-menu-item layer=fakeLayerVisible}}
        {{layer-menu-item layer=fakeLayerVisible}}
        {{layer-menu-item layer=fakeLayerInvisible}}
        {{layer-menu-item layer=fakeLayerInvisible}}
      {{/layer-palette-accordion}}
    `);

    assert.equal(find('.badge').textContent.trim(), '3');

    this.set('fakeLayerInvisible.visible', true);

    assert.equal(find('.badge').textContent.trim(), '5');
  });
});
