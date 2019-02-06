import { module, test } from 'qunit';
import {
  visit, click, fillIn, currentURL,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import mapboxGlLoaded from '../helpers/mapbox-gl-loaded';
import setupMapMocks from '../helpers/setup-map-mocks';

module('Acceptance | bbl lookup', function(hooks) {
  setupApplicationTest(hooks);
  setupMapMocks(hooks);

  test('BBL lookup works', async function(assert) {
    await visit('/');
    await mapboxGlLoaded();
    await click('.bbl-lookup-toggle');
    await click('.bbl-power-select .ember-power-select-trigger');

    await click('.ember-power-select-options li:nth-child(3)');

    await fillIn('.bbl-lookup--block-input', 1);
    await fillIn('.bbl-lookup--lot-input', 1);

    await click('.bbl-lookup-form .button');

    assert.equal(currentURL().split('?')[0], '/lot/3/1/1');
  });
});
