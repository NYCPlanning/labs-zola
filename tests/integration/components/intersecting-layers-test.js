import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | intersecting layers', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with 
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('myProperty', []);

    await render(hbs`{{intersecting-layers tables=myProperty}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#intersecting-layers tables=myProperty}}
        template block text
      {{/intersecting-layers}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});
