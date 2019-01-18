
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:carto-download-link', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.setProperties({
      table: 'mappluto_18v2',
      identifier: 'bbl',
      ids: [1014970028, 1015280036, 1015280038],
      format: 'csv',
    });

    await render(hbs`{{carto-download-link table identifier ids format}}`);

    assert.equal(find('*').textContent.trim(), 'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mappluto_18v2 WHERE bbl IN (1014970028,1015280036,1015280038)&format=csv&filename=mappluto_18v2');
  });
});

