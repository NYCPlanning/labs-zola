import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | layer menu item', function(hooks) {
  setupRenderingTest(hooks);

  test('it indicates whether information may be hidden', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('fakeMap', {
      currentZoom: 8,
    });

    this.set('fakeLimitedZoomLayer', {
      minzoom: 15,
      visible: true,
      config: {
        title: 'test',
      },
    });

    this.set('fakeLayer', {
      visible: true,
      config: {
        title: 'test',
      },
    });

    await render(hbs`
      {{#layer-palette-accordion as |accordion|}}
        {{accordion.menu-item mainMap=fakeMap layer=fakeLimitedZoomLayer}}
        {{accordion.menu-item mainMap=fakeMap layer=fakeLayer}}
      {{/layer-palette-accordion}}
    `);

    assert.equal(findAll('.layer-warning').length, 1);
  });
});
