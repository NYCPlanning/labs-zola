
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('to-title-case', 'helper:to-title-case', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{to-title-case inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

