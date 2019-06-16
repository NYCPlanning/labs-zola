import {
  visit,
  click,
  currentURL,
  find,
  waitUntil,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import { setupMirage } from 'ember-cli-mirage/test-support';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';
import generateMockCartoGeoJSONResponse from '../helpers/mock-carto-geojson';

const localStorageSetStringified = function(key, jsonString) {
  window.localStorage.setItem(key, JSON.stringify(jsonString));
};

module('Acceptance | bookmarks', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  hooks.beforeEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });

  hooks.after(function() {
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
    await percySnapshot('default bookmarks view');

    assert.equal(currentURL(), '/bookmarks');
  });

  test('visiting /bookmarks, see empty message', async function(assert) {
    await visit('/bookmarks');
    await waitUntil(() => find('.content-area'));
    await percySnapshot('default empty bookmarks view');

    assert.ok(find('.no-bookmarks'));
  });

  test('search lot, save, find result in bookmarks, delete it', async function(assert) {
    generateMockCartoGeoJSONResponse(this, {
      id: 1,
      address: '32 WEST 25 STREET',
      bbl: 1,
      bldgarea: 5000,
      bldgclass: 'K1',
      lat: 40.7434315461862,
      lon: -73.9906654966893,
      block: 826,
      borough: 'MN',
      cd: '105',
      condono: 0,
      council: '3',
      firecomp: 'E001',
      histdist: null,
      landmark: null,
      landuse: '05',
      lot: 61,
      lotarea: 4938,
      lotdepth: 98.75,
      lotfront: 50,
      numbldgs: 1,
      numfloors: 1,
      ownername: 'HMH SPECIAL LLC',
      ownertype: null,
      overlay1: null,
      overlay2: null,
      policeprct: '13',
      sanitboro: '1',
      sanitdistr: '05',
      sanitsub: '1B',
      schooldist: '02',
      spdist1: null,
      spdist2: null,
      spdist3: null,
      unitsres: 0,
      unitstotal: 1,
      yearbuilt: '1935',
      yearalter1: 0,
      yearalter2: 0,
      zipcode: 10010,
      zonedist1: 'M1-6',
      zonedist2: null,
      zonedist3: null,
      zonedist4: null,
      zonemap: '8d',
    });
    await visit('/lot/1/47/7501');
    await click('[data-test-bookmark="save"]');
    await percySnapshot('save button works');
    await visit('/bookmarks');
    await percySnapshot('saved bookmark appears');
    assert.equal(find('[data-test-lot-property="bbl"]').textContent.trim(), 1);

    await click('.delete-bookmark-button');
    await percySnapshot('bookmark deleted');

    assert.ok(find('.no-bookmarks'));
  });

  // TODO: i believe there's a weird race condition here where it visits a lot
  // before promises have settled, and too quickly tries to bookmark
  // a lot. hence, we add await settled.
  test('bookmark lot, see count increase, un-bookmark', async function(assert) {
    await visit('/lot/1/47/7501');

    assert.ok(find('[data-test-bookmark-button-saved="false"]'));
    await percySnapshot('no bookmarks counted');
    await click('.bookmark-save-button');

    assert.ok(find('[data-test-bookmark-button-saved="true"]'));
    await percySnapshot('counter has incremented');
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
          bbl: sharedCartoResponseID,
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

    assert.equal(find('[data-test-lot-property="bbl"]').textContent.trim(), sharedCartoResponseID);
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
            bbl: mockId,
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
