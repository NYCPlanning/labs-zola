
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('carto-download-link', 'helper:carto-download-link', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{carto-download-link inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

