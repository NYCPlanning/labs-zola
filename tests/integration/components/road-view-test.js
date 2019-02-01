import { find } from '@ember/test-helpers';
import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('road-view', 'Integration | Component | road view', {
  integration: true,
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{road-view}}`);

  assert.equal(find('*').textContent.trim(), '');
});
