import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | carto-data-provider', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it loads', async function(assert) {
    this.cartoQueryTemplate = function(id) {
      return `${id}`;
    };

    // Template block usage:
    await render(hbs`
      <CartoDataProvider
        @cartoQuery='select some_col from some_table_in_carto'
        as |dataTask|
      >
        {{#dataTask.loaded}}
          it loads
        {{/dataTask.loaded}}
      </CartoDataProvider>
    `);

    assert.equal(this.element.textContent.trim(), 'it loads');
  });
});
