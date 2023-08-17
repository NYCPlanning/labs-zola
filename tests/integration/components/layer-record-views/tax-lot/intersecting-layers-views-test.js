import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module(
  'Integration | Component | layer-record-views/tax-lot/intersecting-layers-views',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    test('it shows none found with empty response', async function (assert) {
      this.server.get('https://planninglabs.carto.com/api/v2/sql', () => ({
        rows: [],
      }));

      await render(hbs`<LayerRecordViews::TaxLot::IntersectingLayersViews />`);

      assert.equal(this.element.textContent.trim(), 'None found');
    });
  }
);
