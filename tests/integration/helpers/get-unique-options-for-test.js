
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('get-unique-options-for', 'helper:get-unique-options-for', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('sql', 'SELECT * FROM support_zoning_co');

  this.render(hbs`{{get-unique-options-for 'overlay' sql}}`);

  assert.equal(typeof this, 'object');
});

