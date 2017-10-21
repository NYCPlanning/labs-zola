
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('carto-download-link', 'helper:carto-download-link', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.setProperties({
    table: 'support_mappluto',
    identifier: 'bbl',
    ids: [1014970028, 1015280036, 1015280038],
    format: 'csv',
  });

  this.render(hbs`{{carto-download-link table identifier ids format}}`);

  assert.equal(this.$().text().trim(), 'https://carto.planninglabs.nyc/user/data/api/v2/sql?q=SELECT * FROM support_mappluto WHERE bbl IN (1014970028,1015280036,1015280038)&format=csv&filename=support_mappluto');
});

