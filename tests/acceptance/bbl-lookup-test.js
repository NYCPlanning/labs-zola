import { module, skip } from 'qunit';
import {
  visit, click, typeIn, currentURL,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMapMocks from '../helpers/setup-map-mocks';

module('Acceptance | bbl lookup', function(hooks) {
  setupApplicationTest(hooks);
  setupMapMocks(hooks);

  // this test is flakey, we need to investigate why it is asserting
  // before it has finished loading the route
  // a quick fix that's also the "right" way is to stub in the network
  // requests - the carto query is quite slow
  skip('BBL lookup works', async function(assert) {
    await visit('/');

    await click('.bbl-lookup-toggle');
    await click('.bbl-power-select .ember-power-select-trigger');
    await click('.ember-power-select-options li:nth-child(3)');

    await typeIn('.bbl-lookup--block-input', '1');
    await typeIn('.bbl-lookup--lot-input', '1');

    await click('.bbl-lookup-form .button');

    assert.equal(currentURL().split('?')[0], '/lot/3/1/1');
  });
});
