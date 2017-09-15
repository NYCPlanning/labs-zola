import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';
import { click, fillIn, find, findAll, keyEvent, waitUntil, triggerEvent } from 'ember-native-dom-helpers';

const SEARCH_INPUT_SELECTOR = '.search input';
const SEARCH_RESULTS_SELECTOR = '.search-results';
const LOT_URL_ROOT = '/lot';
const SEARCH_TERM_LOT = '120 Broadway';
const SEARCH_TERM_ADDRESS = '210 Humboldt';
const SEARCH_RESULTS_LOADING_CLASS = '.search-results--loading';
const timeout = 15000;
const resultAt = function(x) {
  return `${SEARCH_RESULTS_SELECTOR} li:nth-child(${x + 1})`;
};

moduleForAcceptance('Acceptance | index');

test('map-search enter on first search result for lot', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keypress', 13);

  assert.notEqual(
    currentURL().indexOf(LOT_URL_ROOT),
    'NOT -1',
  );
});

test('map-search keydown, keyup, keyup -> first result highlighted', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await waitUntil(() => find('.has-results'), { timeout });
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 40);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);
  await keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38);

  assert.notEqual(
    find(resultAt(1)).className.indexOf('highlighted-result'),
    -1,
  );
});

test('map-search no lot found, return address', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_ADDRESS);
  await waitUntil(() => find('.has-results'), { timeout });
  assert.notEqual(
    find(resultAt(1)).textContent.indexOf('(Address)'),
    'NOT -1',
  );
});

