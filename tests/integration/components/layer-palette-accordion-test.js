import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layer-palette-accordion', 'Integration | Component | layer palette accordion', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layer-palette-accordion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layer-palette-accordion}}
      template block text
    {{/layer-palette-accordion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('count number of visible layer-menu-item child descendents, updates', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('fakeLayerVisible', {
    visible: true,
  });

  this.set('fakeLayerInvisible', {
    visible: false,
  });

  // Template block usage:
  this.render(hbs`
    {{#layer-palette-accordion}}
      {{layer-menu-item layer=fakeLayerVisible}}
      {{layer-menu-item layer=fakeLayerVisible}}
      {{layer-menu-item layer=fakeLayerVisible}}
      {{layer-menu-item layer=fakeLayerInvisible}}
      {{layer-menu-item layer=fakeLayerInvisible}}
    {{/layer-palette-accordion}}
  `);

  assert.equal(this.$('.badge').text().trim(), '3');

  this.set('fakeLayerInvisible.visible', true);

  assert.equal(this.$('.badge').text().trim(), '5');
});
