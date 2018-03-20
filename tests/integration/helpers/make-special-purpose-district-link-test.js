
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('make-special-purpose-district-link', 'helper:make-special-purpose-district-link', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{make-special-purpose-district-link inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

