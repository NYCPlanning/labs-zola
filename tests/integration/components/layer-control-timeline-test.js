import { module, test } from 'qunit';
import { render, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../../mirage/static-fixtures/layer-groups';

module('Integration | Component | layer control timeline', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('it renders', async function (assert) {
    const layers = await this.owner
      .lookup('service:store')
      .findAll('layer-group');
    this.layer = layers.findBy('id', 'zoning-map-amendments');

    await render(hbs`
      {{layer-control-timeline
        start=(array 1032370151000 1092370199000)
        layerGroup=this.layer
        column='effective_epoch'
      }}`);

    assert.equal(this.element.textContent.trim(), '2002-092004-08');
  });

  test('it changes slider', async function (assert) {
    const layers = await this.owner
      .lookup('service:store')
      .query('layer-group', {});
    this.layer = layers.findBy('id', 'zoning-map-amendments');

    await render(hbs`
      {{layer-control-timeline
        start=(array 1032370151000 1092370199000)
        layerGroup=this.layer
        column='effective_epoch'
      }}`);

    await click('.noUi-handle.noUi-handle-lower');

    assert.equal(this.element.textContent.trim(), '2002-092004-08');
  });
});
