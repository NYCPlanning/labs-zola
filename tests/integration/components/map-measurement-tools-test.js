import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import stubBasicMap from '../../helpers/stub-basic-map';

module('Integration | Component | map-measurement-tools', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#map-measurement-tools
        map=map
        draw=this.draw as |measurement|
      }}

      {{/map-measurement-tools}}
    `);

    assert.ok(this.element);
  });
});
