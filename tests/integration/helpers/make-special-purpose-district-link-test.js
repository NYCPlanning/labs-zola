
import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:make-special-purpose-district-link', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  skip('it renders', function(assert) {
    this.set('inputValue', ['1234']);

    this.render(hbs`{{make-special-purpose-district-link inputValue}}`);

    assert.equal(find('*').textContent.trim(), '1234');
  });
});
