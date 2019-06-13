import {
  visit,
  click,
  currentURL,
  find,
  waitUntil,
  pauseTest,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
// import { percySnapshot } from 'ember-percy';
import { setupMirage } from 'ember-cli-mirage/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

const localStorageSetStringified = function(key, jsonString) {
  window.localStorage.setItem(key, JSON.stringify(jsonString));
};

module('Acceptance | bookmarks', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  hooks.afterEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });

  test('visiting /bookmarks', async function(assert) {
    await visit('/bookmarks');
    // await percySnapshot('default bookmarks view');
    assert.equal(currentURL(), '/bookmarks');
  });

  test('visiting /bookmarks, see empty message', async function(assert) {
    await visit('/bookmarks');
    await waitUntil(() => find('.content-area'));
    // await percySnapshot('default empty bookmarks view');

    assert.ok(find('.no-bookmarks'));
  });

  test('search lot, save, find result in bookmarks, delete it', async function(assert) {
    await visit('/lot/1/47/7501');
    await click('.bookmark-save-button');
    // await percySnapshot('save button works');
    await visit('/bookmarks');
    await waitUntil(() => find('.content-area'));
    // await percySnapshot('saved bookmark appears');
    await click('.delete-bookmark-button');
    // await percySnapshot('bookmark deleted');

    assert.ok(find('.no-bookmarks'));
  });

  test('bookmark lot, see count increase, un-bookmark', async function(assert) {
    await visit('/lot/1/47/7501');
    // await percySnapshot('no bookmarks counted');
    await click('.bookmark-save-button');

    assert.equal(find('.saved-bookmarks-counter .badge').textContent.trim(), '1');
    // await percySnapshot('counter has incremented');
    await click('.bookmark-save-button');
    assert.equal(find('.saved-bookmarks-counter .badge'), null);
  });

  test('it displays a saved bookmark', async function(assert) {
    const sharedCartoResponseID = 3034430054;
    this.get('https://planninglabs.carto.com/api/v2/sql', () => ({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [[0, 0], [0, 1], [1, 0], [1, 1], [0, 0]] },
        properties: {
          id: sharedCartoResponseID,
          boro: 'test',
          block: 'test',
          lot: 'test',
          address: 'test',
          bbl: 'test',
        },
      }],
    }));

    // load storage with dummy data
    localStorageSetStringified('bookmarks-test', {
      id: 'test',
      attributes: { address: null },
      relationships: {
        bookmark: {
          data: {
            type: 'lots',
            id: sharedCartoResponseID, // id must match what is returned from carto
          },
        },
      },
      type: 'bookmarks',
    });

    localStorageSetStringified('index-bookmarks', ['bookmarks-test']);

    await visit('/bookmarks');

    await pauseTest();

    assert.ok(false);
  });
});
