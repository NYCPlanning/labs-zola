
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('get-unique-options-for', 'helper:get-unique-options-for', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{get-unique-options-for inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

