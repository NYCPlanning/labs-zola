import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const feature = {
  type: 'Feature',
  geometry: {},
  properties: {
    foo: 'bar',
  },
};

const template = 'The value of foo is {{foo}}';

module('Integration | Component | tooltip-renderer', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders a tooltipTemplate', async function(assert) {
    this.set('feature', feature);
    this.set('template', template);

    await render(hbs`{{tooltip-renderer feature=feature template=template}}`);

    assert.equal(this.element.textContent.trim(), 'The value of foo is bar');
  });
});
