import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL, pauseTest, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import mapboxGlLoaded from '../helpers/mapbox-gl-loaded';

module('Acceptance | bbl lookup', function(hooks) {
  setupApplicationTest(hooks);

  test('BBL lookup works', async function(assert) {
    await visit('/');
    await mapboxGlLoaded();
    await click('.bbl-lookup-toggle');
    await click('.bbl-power-select .ember-power-select-trigger');

    await click('.ember-power-select-options li:nth-child(3)');

    await fillIn('.bbl-lookup--block-input', 1);
    await fillIn('.bbl-lookup--lot-input', 1);

    await click('.bbl-lookup-form .button');
    
    assert.equal(currentURL(), '/lot/3/1/1');
  });
});
