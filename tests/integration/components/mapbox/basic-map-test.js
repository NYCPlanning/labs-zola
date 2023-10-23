import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

const MAPBOX_GL_BLANK_STYLE = {
  mapboxStyle: {
    version: 8,
    sources: {},
    layers: [],
  },
};

module('Integration | Component | mapbox/basic-map', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroups.meta = MAPBOX_GL_BLANK_STYLE;

    // render with a block. the block only gets yielded when the map has finished rendering
    await render(hbs`
      {{#mapbox/basic-map
        layerGroups=this.layerGroups as |map|
      }}
        Map exists
      {{/mapbox/basic-map}}
    `);

    // assert that the text appears
    assert.ok(this.element.textContent.trim().includes('Map exists'));
  });
});
