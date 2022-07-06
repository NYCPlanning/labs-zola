import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bookmark button', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{bookmarks/bookmark-button}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    this.render(hbs`
      {{#bookmarks/bookmark-button}}
        template block text
      {{/bookmarks/bookmark-button}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
