import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('info-tooltip', 'Integration | Component | info tooltip', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{info-tooltip}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#info-tooltip}}
      template block text
    {{/info-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
