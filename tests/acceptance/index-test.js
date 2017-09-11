import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';

const SEARCH_INPUT_SELECTOR = '.search input';
const SEARCH_RESULTS_SELECTOR = '.search-results';
const LOT_URL_ROOT = '/lot';
const SEARCH_TERM_LOT = '120 Broadway';
const SEARCH_TERM_ADDRESS = '210 Humboldt';
const SEARCH_RESULTS_LOADING_CLASS = '.search-results--loading';
const resultAt = function(x) {
  return `${SEARCH_RESULTS_SELECTOR} li:nth-child(${x})`;
};

moduleForAcceptance('Acceptance | index');

test('map-search enter on first search result for lot', function(assert) {
  visit('/');
  fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

  andThen(() => {
    keyEvent(SEARCH_INPUT_SELECTOR, 'keypress', 13).then(() => {
      andThen(() => {
        assert.notEqual(
          currentURL().indexOf(LOT_URL_ROOT),
          'NOT -1',
        );
      });
    });
  });
});


test('map-search keydown and second result highlighted', function(assert) {
  visit('/');
  fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

  andThen(() => {
    keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 40).then(() => {
      andThen(() => {
        assert.equal(
          find(resultAt(2)).attr('class'),
          'highlighted-result',
        );
      });
    });
  });
});

test('map-search keydown, keyup, keyup -> first result highlighted', function(assert) {
  visit('/');
  fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

  andThen(() => {
    keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 40).then(() => {
      keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38).then(() => {
        keyEvent(SEARCH_INPUT_SELECTOR, 'keyup', 38).then(() => {
          andThen(() => {
            assert.equal(
              find(resultAt(1)).attr('class'),
              'highlighted-result',
            );
          });
        });
      });
    });
  });
});

test('map-search no lot found, return address', function(assert) {
  visit('/');
  fillIn(SEARCH_INPUT_SELECTOR, SEARCH_TERM_ADDRESS).then(() => {
    andThen(() => {
      assert.notEqual(
        find(resultAt(1)).text().indexOf('(Address)'),
        'NOT -1',
      );
    });
  });
});

