import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('main-map', 'Integration | Component | main map', {
  integration: true,
});

test('it renders', (assert) => {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{main-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#main-map}}
      template block text
    {{/main-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
