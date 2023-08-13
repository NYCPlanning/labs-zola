import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | layer-record-views/zoning-district',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      this.zoningDistrict = {
        properties: {
          zonedist: 'R6A',
        },
      };

      await render(hbs`  <LayerRecordViews::ZoningDistrict
    @model={{this.zoningDistrict.properties}}
  />`);

      assert.ok(this.element);
    });
  }
);
