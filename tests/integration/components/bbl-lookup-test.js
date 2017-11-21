import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bbl-lookup', 'Integration | Component | bbl lookup', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bbl-lookup}}`);

  assert.equal(this.$().text().trim(), 'BBL Lookup');
});
