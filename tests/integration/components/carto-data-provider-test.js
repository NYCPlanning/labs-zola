import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | carto-data-provider', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it loads', async function(assert) {
    this.server.create('lot', { id: 'bbl' });

    this.cartoQueryTemplate = function(id) {
      return `${id}`;
    };

    // Template block usage:
    await render(hbs`
      <CartoDataProvider
        @modelId='bbl'
        @modelName='lot'
        as |dataTask|
      >
        it loads
      </CartoDataProvider>
    `);

    assert.equal(this.element.textContent.trim(), 'it loads');
  });
});
