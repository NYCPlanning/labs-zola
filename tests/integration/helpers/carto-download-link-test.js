
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:carto-download-link', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.setProperties({
      table: 'dcp_mappluto',
      identifier: 'bbl',
      ids: [1014970028, 1015280036, 1015280038],
      format: 'csv',
    });

    await render(hbs`{{carto-download-link table identifier ids format}}`);

    assert.equal(this.element.textContent.trim(), 'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM dcp_mappluto WHERE bbl IN (1014970028,1015280036,1015280038)&format=csv&filename=dcp_mappluto');
  });
});
