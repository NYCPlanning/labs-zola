import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layer-menu-item', 'Integration | Component | layer menu item', {
  integration: true
});

test('it indicates whether information may be hidden', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('fakeMap', {
    currentZoom: 8,
  });

  this.set('fakeLimitedZoomLayer', {
    minzoom: 15,
    visible: true,
    config: {
      title: 'test',
    },
  });

  this.set('fakeLayer', {
    visible: true,
    config: {
      title: 'test',
    },
  });

  this.render(hbs`
    {{#layer-palette-accordion}}
      {{layer-menu-item mainMap=fakeMap layer=fakeLimitedZoomLayer}}
      {{layer-menu-item mainMap=fakeMap layer=fakeLayer}}
    {{/layer-palette-accordion}}
  `);

  assert.equal(this.$('.layer-warning').length, 1);
});
