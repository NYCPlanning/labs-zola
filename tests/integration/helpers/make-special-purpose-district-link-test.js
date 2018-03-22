
import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('make-special-purpose-district-link', 'helper:make-special-purpose-district-link', {
  integration: true
});

// Replace this with your real tests.
skip('it renders', function(assert) {
  this.set('inputValue', ['1234']);

  this.render(hbs`{{make-special-purpose-district-link inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

