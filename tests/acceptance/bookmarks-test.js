import { 
  visit, 
  click,
  fillIn,
  currentURL,
  find,
  findAll,
  triggerKeyEvent,
  waitUntil,
  triggerEvent 
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

const SEARCH_INPUT_SELECTOR = '.map-search-input';
const SEARCH_TERM_ADDRESS = '210 Humboldt';
const SEARCH_TERM_LOT = '1000477501';

module('Acceptance | bookmarks', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('visiting /bookmarks', async function(assert) {
    await visit('/bookmarks');

    assert.equal(currentURL(), '/bookmarks');
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
    await click('.result');
    await waitUntil(() => (currentURL().indexOf('/lot') >= 0));
    await click('.bookmark-save-button');
    await visit('/bookmarks');
    await waitUntil(() => find('.content-area'));
    await click('.delete-bookmark-button');
    assert.ok(find('.no-bookmarks'));
  });

  test('bookmark lot, see count increase, un-bookmark', async function(assert) {
    await visit('/');
    await fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);
    await waitUntil(() => find('.has-results'));
    await click('.result');
    await waitUntil(() => (currentURL().indexOf('/lot') >= 0));
    await click('.bookmark-save-button');

    assert.equal(find('.saved-bookmarks-counter .badge').textContent, "1");
    await click('.bookmark-save-button');
    assert.equal(find('.saved-bookmarks-counter .badge'), null);
  });
});
