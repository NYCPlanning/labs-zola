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
import Sinon from 'sinon';
import stubBasicMap from '../helpers/stub-basic-map';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

const localStorageSetStringified = function(key, jsonString) {
  window.localStorage.setItem(key, JSON.stringify(jsonString));
};

module('Acceptance | bookmarks', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

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
    this.server.create('lot', {
      id: 1000477501,
      properties: {
        borocode: '1',
      },
    });

    await visit('/lot/1/47/7501');
    await click('[data-test-bookmark="save"]');
    await percySnapshot('save button works');
    await visit('/bookmarks');
    await percySnapshot('saved bookmark appears');
    assert.equal(find('[data-test-lot-property="bbl"]').textContent.trim(), 1000477501);

    await click('.delete-bookmark-button');
    await percySnapshot('bookmark deleted');

    assert.ok(find('.no-bookmarks'));
  });

  // TODO: i believe there's a weird race condition here where it visits a lot
  // before promises have settled, and too quickly tries to bookmark
  // a lot. hence, we add await settled.
  test('bookmark lot, see count increase, un-bookmark', async function(assert) {
    this.server.create('lot', {
      id: 1000477501,
      properties: {
        borocode: '1',
      },
    });

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
    const sharedCartoResponseID = '3034430054';

    this.server.create('lot', {
      id: sharedCartoResponseID,
      properties: {
        bbl: sharedCartoResponseID,
        boro: 'test',
        block: 'test',
        lot: 'test',
        address: 'test',
        borocode: '1',
      },
    });

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
    this.server.create('lot', {
      id: 1,
      properties: {
        borocode: '1',
      },
    });

    this.server.create('lot', {
      id: 2,
      properties: {
        borocode: '1',
      },
    });

    // load storage with dummy data
    localStorageSetStringified('bookmarks-1', {
      id: 'test-1',
      attributes: { address: null },
      relationships: {
        bookmark: {
          data: {
            type: 'lots',
            id: '1', // id must match what is returned from carto
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

  test('it works with legacy records', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '050111azmk',
    });

    localStorageSetStringified('bookmarks-1', {
      id: 'test',
      attributes: {
        address: null,
      },
      relationships: {
        bookmark: {
          data: {
            type: 'zmas',
            id: '050111azmk',
          },
        },
      },
      type: 'bookmarks',
    });

    localStorageSetStringified('index-bookmarks', ['bookmarks-1']);

    await visit('/bookmarks');

    assert.ok(true);
  });

  test('it highlights bookmarked lots on map', async function(assert) {
    this.sandbox = Sinon.createSandbox();
    this.addLayerSpy = this.sandbox.spy(this.map, 'addLayer');

    this.server.create('lot', {
      id: '1234',
    });

    localStorageSetStringified('bookmarks-1', {
      id: 'test',
      attributes: {
        address: null,
      },
      relationships: {
        bookmark: {
          data: {
            type: 'lots',
            id: '1234',
          },
        },
      },
      type: 'bookmarks',
    });

    localStorageSetStringified('index-bookmarks', ['bookmarks-1']);

    await visit('/bookmarks');

    assert.ok(this.addLayerSpy.calledWithMatch({ id: 'bookmarked-lots' }), 'it adds bookmarked lots');

    this.sandbox.restore();
  });
});
