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
const SEARCH_TERM_ADDRESS = '210 Humboldt';
const SEARCH_TERM_LOT = '1000477501';

moduleForAcceptance('Acceptance | bookmarks', {
  beforeEach() {
    window.localStorage.clear();
  },
});

test('visiting /bookmarks', function(assert) {
  visit('/bookmarks');

  andThen(function() {
    assert.equal(currentURL(), '/bookmarks');
  });
});

test('visiting /bookmarks, see empty message', async function(assert) {
  await visit('/bookmarks');
  await waitUntil(() => find('.content-area'));

  assert.ok(find('.no-bookmarks'));
});

test('search lot, save, find result in bookmarks, delete it', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await waitUntil(() => find('.has-results'));
  await keyEvent('.tax-lot', 'click');
  await waitUntil(() => (currentURL().indexOf('/lot') >= 0));
  await keyEvent('.bookmark-save-button', 'click');
  await visit('/bookmarks');
  await waitUntil(() => find('.content-area'));
  await keyEvent('.delete-bookmark-button', 'click');
  assert.ok(find('.no-bookmarks'));
});

test('bookmark lot, see count increase, un-bookmark', async function(assert) {
  await visit('/');
  await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
  await waitUntil(() => find('.has-results'));
  await keyEvent('.tax-lot', 'click');
  await waitUntil(() => (currentURL().indexOf('/lot') >= 0));
  await keyEvent('.bookmark-save-button', 'click');

  assert.equal(find('.saved-bookmarks-counter .badge').textContent, "1");
  await keyEvent('.bookmark-save-button', 'click');
  assert.equal(find('.saved-bookmarks-counter .badge'), null);
});
