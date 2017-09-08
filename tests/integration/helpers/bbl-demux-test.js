
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bbl-demux', 'helper:bbl-demux', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', { boro: 4, block: 4381, lot: 1});

  this.render(hbs`{{bbl-demux inputValue}}`);

  assert.equal(this.$().text().trim(), '4043810001');
});
