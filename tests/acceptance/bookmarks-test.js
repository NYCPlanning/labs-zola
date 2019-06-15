import {
  visit,
  click,
  currentURL,
  find,
  waitUntil,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
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
    assert.equal(currentURL(), '/bookmarks');
  });

  test('visiting /bookmarks, see empty message', async function(assert) {
    await visit('/bookmarks');
    await waitUntil(() => find('.content-area'));

    assert.ok(find('.no-bookmarks'));
  });

  test('search lot, save, find result in bookmarks, delete it', async function(assert) {
    this.server.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
      const { format } = request.queryParams;

      if (format !== 'geojson') return { rows: [] };

      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
          },
          properties: {
            id: 3034430054,
            boro: 'test',
            block: 'test',
            lot: 'test',
            address: 'test',
            bbl: 'test-bbl',
          },
        }],
      };
    });

    await visit('/lot/1/47/7501');
    await click('[data-test-bookmark="save"]');
    await visit('/bookmarks');

    assert.equal(find('[data-test-lot-property="bbl"]').textContent.trim(), 'test-bbl');

    await click('.delete-bookmark-button');

    assert.ok(find('.no-bookmarks'));
  });

  // TODO: i believe there's a weird race condition here where it visits a lot
  // before promises have settled, and too quickly tries to bookmark
  // a lot. hence, we add await settled.
  test('bookmark lot, see count increase, un-bookmark', async function(assert) {
    await visit('/lot/1/47/7501');

    assert.ok(find('[data-test-bookmark-button-saved="false"]'));
    await click('.bookmark-save-button');

    assert.ok(find('[data-test-bookmark-button-saved="true"]'));
    await click('.bookmark-save-button');

    assert.ok(find('[data-test-bookmark-button-saved="false"]'));
  });

  test('it displays a saved bookmark', async function(assert) {
    const sharedCartoResponseID = 3034430054;
    this.server.get('https://planninglabs.carto.com/api/v2/sql', () => ({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
        },
        properties: {
          id: sharedCartoResponseID,
          boro: 'test',
          block: 'test',
          lot: 'test',
          address: 'test',
          bbl: 'test-bbl',
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

    assert.equal(find('[data-test-lot-property="bbl"]').textContent.trim(), 'test-bbl');
  });

  test('it displays a multiple lots', async function(assert) {
    let mockId = 0;

    this.server.get('https://planninglabs.carto.com/api/v2/sql', () => {
      mockId += 1;
      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
          },
          properties: {
            id: mockId,
            boro: 'test',
            block: 'test',
            lot: 'test',
            address: 'test',
            bbl: 'test-bbl',
          },
        }],
      };
    });

    // load storage with dummy data
    localStorageSetStringified('bookmarks-1', {
      id: 'test-1',
      attributes: { address: null },
      relationships: {
        bookmark: {
          data: {
            type: 'lots',
            id: 1, // id must match what is returned from carto
          },
        },
      },
      type: 'bookmarks',
    });

    localStorageSetStringified('bookmarks-2', {
      id: 'test-2',
      attributes: { address: null },
      relationships: {
        bookmark: {
          data: {
            type: 'lots',
            id: 2, // id must match what is returned from carto
          },
        },
      },
      type: 'bookmarks',
    });

    localStorageSetStringified('index-bookmarks', ['bookmarks-1', 'bookmarks-2']);

    await visit('/bookmarks');

    assert.ok(find('[data-test-bookmark="test-1"]'));
    assert.ok(find('[data-test-bookmark="test-2"]'));
  });
});
