import {
  visit,
  click,
  fillIn,
  find,
  triggerKeyEvent,
  waitUntil,
  currentURL,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import { setupMirage } from 'ember-cli-mirage/test-support';
import config from '../../config/environment';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

const { 'labs-search': { host: labsSearchHost } } = config;

const SEARCH_INPUT_SELECTOR = '.map-search-input';
const SEARCH_RESULTS_SELECTOR = '.search-results';
const SEARCH_TERM_LOT = '1000477501';
const timeout = 15000;
const resultAt = function(x) {
  return `${SEARCH_RESULTS_SELECTOR} li:nth-child(${x + 1})`;
};

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('v1/layer-groups', () => layerGroupsFixtures);
  });

  hooks.beforeEach(function() {
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{ bbl: 1000477501, label: '120 Broadway, Manhattan', type: 'lot' }];
    });
  });

  test('map-search enter on first search result', async function(assert) {
    await visit('/');
    await percySnapshot('view on first load');
    await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
    await percySnapshot('searches');
    await waitUntil(() => find('.has-results'), { timeout });
    await click('.result');
    await percySnapshot('clicks result');

    assert.equal(
      (currentURL().indexOf('/') > -1),
      true,
    );
  });

  test('map-search keydown, keyup, keyup -> first result highlighted', async function(assert) {
    await visit('/');
    await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
    await waitUntil(() => find('.has-results'), { timeout });
    await triggerKeyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 40);
    await triggerKeyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);
    await triggerKeyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);

    assert.equal(
      (find(resultAt(1)).className.indexOf('highlighted-result') > -1),
      true,
    );
  });
});
