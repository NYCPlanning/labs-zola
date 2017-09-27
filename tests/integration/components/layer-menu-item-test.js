import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layer-menu-item', 'Integration | Component | layer menu item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{#layer-palette-accordion}}{{layer-menu-item title='test'}}{{/layer-palette-accordion}}`);

  assert.ok(this);
});
