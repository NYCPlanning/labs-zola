import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lot-bookmark-item', 'Integration | Component | lot bookmark item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lot-bookmark-item}}`);

  assert.equal(this.$().text().trim(), '×');

  // Template block usage:
  this.render(hbs`
    {{#lot-bookmark-item}}
      template block text
    {{/lot-bookmark-item}}
  `);

  assert.equal(this.$().text().trim(), '×');
});
