import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL, pauseTest, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bbl lookup', function(hooks) {
  setupApplicationTest(hooks);

  test('BBL lookup works', async function(assert) {
    await visit('/');
    await click('.bbl-lookup-toggle');
    await click('.bbl-power-select .ember-power-select-trigger');
    await click('.ember-power-select-options li:nth-child(3)');
    await fillIn('.bbl-block-input', '1');
    await fillIn('.bbl-lot-input', '1');
    await triggerKeyEvent('.bbl-lot-input', 'keyup', 49)
    await click('.bbl-lookup-form .button');
    assert.equal(currentURL(), '/lot/3/1/1');
  });
});
