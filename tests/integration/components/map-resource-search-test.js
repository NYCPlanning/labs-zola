import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  fillIn,
  click,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import config from 'labs-zola/config/environment';
import Service from '@ember/service';

const { 'labs-search': { host: labsSearchHost } } = config;

// generic procedure for typing in a search with a given result and assertion
const runSearch = async function() {
  await render(hbs`<MapResourceSearch />`);
  await fillIn('[data-test-search="resource"] .map-search-input', 'test');
  await click('.result');
};

// this behavior is already tested in an acceptance test
module('Integration | Component | map-resource-search', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const testContext = this;
    class RouterServiceStub extends Service {
      transitionTo(...args) {
        testContext.transitionTo(...args);
      }
    }

    class MainMapServiceStub extends Service {
      mapInstance = {
        flyTo(...args) {
          testContext.flyTo(...args);
        },
      };
    }

    this.owner.unregister('service:router');
    this.owner.register('service:router', RouterServiceStub);

    this.owner.unregister('service:main-map');
    this.owner.register('service:main-map', MainMapServiceStub);
  });

  test('it renders', async function(assert) {
    await render(hbs`<MapResourceSearch />`);

    assert.ok(true);
  });


  test('map search for search api works: lot', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        bbl: 'test',
        type: 'lot',
        label: '120 Broadway, Manhattan',
      }];
    });

    this.transitionTo = (route) => { assert.equal(route, 'map-feature.lot'); };

    await runSearch();
  });

  test('map search for search api works: zoning-map-amendment', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        ulurpno: 'test',
        type: 'zma',
        label: '120 Broadway, Manhattan',
      }];
    });

    this.transitionTo = (route) => { assert.equal(route, 'map-feature.zoning-map-amendment'); };

    await runSearch();
  });

  test('map search for search api works: zoning-district', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        type: 'zoning-district',
        label: 'C1-5',
      }];
    });

    this.transitionTo = (route) => { assert.equal(route, 'map-feature.zoning-district'); };

    await runSearch();
  });

  test('map search for search api works: neighborhood', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        neighbourhood: 'test',
        type: 'neighborhood',
        coordinates: [0, 0],
        label: '120 Broadway, Manhattan',
      }];
    });

    this.flyTo = (mapboxObject) => {
      assert.deepEqual(mapboxObject, {
        center: [0, 0],
        zoom: 13,
      });
    };

    await runSearch();
  });

  test('map search for search api works: special-purpose-district', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        type: 'special-purpose-district',
        sdname: 'test',
        cartodb_id: 'test',
        label: '120 Broadway, Manhattan',
      }];
    });

    this.transitionTo = (route) => { assert.equal(route, 'map-feature.special-purpose-district'); };

    await runSearch();
  });

  test('map search for search api works: commercial-overlay', async function(assert) {
    assert.expect(1);

    // mock server response that returns a "lot"
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{
        type: 'commercial-overlay',
        label: '120 Broadway, Manhattan',
      }];
    });

    this.transitionTo = (route) => { assert.equal(route, 'map-feature.commercial-overlay'); };

    await runSearch();
  });
});
