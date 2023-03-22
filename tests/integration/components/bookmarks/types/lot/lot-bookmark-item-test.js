import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lot bookmark item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{bookmarks/types/lot/lot-bookmark-item}}`);

    assert.equal(this.element.textContent.trim(), '×');

    // Template block usage:
    await render(hbs`
      {{#bookmarks/types/lot/lot-bookmark-item}}
        template block text
      {{/bookmarks/types/lot/lot-bookmark-item}}
    `);

    assert.equal(this.element.textContent.trim(), '×');
  });
});
