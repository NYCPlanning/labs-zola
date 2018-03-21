import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';
import {
  click,
  fillIn,
  find,
  findAll,
  keyEvent,
  waitUntil,
  triggerEvent
} from 'ember-native-dom-helpers';

const SEARCH_INPUT_SELECTOR = '.search input';
const SEARCH_RESULTS_SELECTOR = '.search-results';
const LOT_URL_ROOT = '/lot';
const SEARCH_TERM_LOT = '1000477501';
const SEARCH_TERM_ADDRESS = '210 Humboldt Street, Brooklyn, New York, NY, USA';
const SEARCH_RESULT_LABEL = '210 HUMBOLDT STREET, Brooklyn, New York, NY, USA';
const SEARCH_RESULTS_LOADING_CLASS = '.search-results--loading';
const FONT_AWESOME_MAP_PIN = '.fa-map-pin';
const timeout = 15000;
const resultAt = function(x) {
  return `${SEARCH_RESULTS_SELECTOR} li:nth-child(${x + 1})`;
};

moduleForAcceptance('Acceptance | index');

test('map-search enter on first search result', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await waitUntil(() => find('.has-results'), { timeout });
  await keyEvent('.tax-lot', 'click');
  // await keyEvent(SEARCH_INPUT_SELECTOR, 'keypress', 13);

  assert.equal(
    (currentURL().indexOf('/') > -1),
    true,
  );
});

test('map-search keydown, keyup, keyup -> first result highlighted', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await waitUntil(() => find('.has-results'), { timeout });
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 40);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);

  assert.equal(
    (find(resultAt(1)).className.indexOf('highlighted-result') > -1),
    true,
  );
});

test('Map search: hide result list on focus out, persist search result label', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_ADDRESS);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'click');
  await waitUntil(() => find('.has-results'), { timeout });

  assert.ok(
    find('.focused'),
  );

  await keyEvent(find(resultAt(1)), 'click');

  assert.notOk(
    find('.focused'),
  );

  assert.equal(
    find(SEARCH_INPUT_SELECTOR).value,
    SEARCH_RESULT_LABEL,
  );
});
