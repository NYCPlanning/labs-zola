import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  find,
  click,
  fillIn,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from 'labs-zola/mirage/static-fixtures/layer-groups';
import stubBasicMap from 'labs-zola/tests/helpers/stub-basic-map';
import config from 'labs-zola/config/environment';
import Sinon from 'sinon';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

const { 'labs-search': { host: labsSearchHost } } = config;
const DEFAULT_REQUIRED_FEATURE_PROPS = {
  type: 'Feature',
  layer: {
    id: 'pluto-fill',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
  },
  properties: {},
};

const clickMap = async function(map, properties) {
  map.features = [{
    ...DEFAULT_REQUIRED_FEATURE_PROPS,
    properties,
  }];

  await map.events.mousemove();
  await map.events.click();
};

const hoverMap = async function(map, overrides = {}) {
  map.features = [{
    ...DEFAULT_REQUIRED_FEATURE_PROPS,
    ...overrides,
  }];

  await map.events.mousemove({
    point: { x: 0, y: 0 },
  });
};

const toggleLayerGroupOn = async function(selector) {
  if (!find(`${selector}.active`)) {
    await click(`${selector} .layer-group-toggle-label`);
  }
};

// this is pretty bad - this assumes that all hoverable layer groups
// include a layer with an id that has "-fill" affixed.
const lookupLayerIDsFromFixtures = function(layerGroupId) {
  const { relationships: { layers } } = layerGroupsFixtures.data
    .findBy('id', layerGroupId);

  return layers.data.mapBy('id');
};

const hoverLayerGroup = async function(map, layerGroupId, ...args) {
  const ids = lookupLayerIDsFromFixtures(layerGroupId);
  return ids.map(async id => hoverMap(map, { layer: { id } }, ...args));
};

const assertLayerGroupAdded = async function(testScope, assert, layerGroupId) {
  // it adds the layers when toggled or if default
  const ids = lookupLayerIDsFromFixtures(layerGroupId);
  await toggleLayerGroupOn(`[data-test-toggle-${layerGroupId}]`);
  ids.forEach(id => assert.ok(testScope.addLayerSpy.calledWithMatch({ id }), `it adds layer: ${id}`));
};

const assertClickRouteBehavior = async function(testScope, assert, options) {
  if (find('[data-test-button="close-route"]')) {
    await click('[data-test-button="close-route"]');
  }

  const {
    highlights = true,
    fitBounds = true,
    clickObject = {},
    expectedURL = '',
  } = options;

  const highlightsAssertMethod = highlights ? 'ok' : 'notOk';
  const fitBoundsAssertMethod = fitBounds ? 'ok' : 'notOk';

  // when click the layer group
  await clickMap(testScope.map, clickObject);

  // it routes
  assert.ok(currentURL().includes(expectedURL), 'it routes');

  // it highlights selected
  assert[highlightsAssertMethod](testScope.addSourceSpy.calledWith('selected-lot'), `highlights should be ${highlightsAssertMethod}`);

  // it fits bounds on click
  // the bounding box is assumes to be the computed bounding box of the dummy
  // data, which is defined in the beforeEach
  assert[fitBoundsAssertMethod](testScope.fitBoundsSpy.calledWith([0, 0, 1, 1]), `fitting bounds should be ${fitBoundsAssertMethod}`);
};

const assertCanBookmark = async function(testScope, assert, clickObject) {
  if (find('[data-test-button="close-route"]')) {
    await click('[data-test-button="close-route"]');
  }

  await clickMap(testScope.map, clickObject);
  await click('[data-test-bookmark="save"]');

  assert.ok(find('[data-test-bookmark-button-saved="true"]'), 'it saves bmark');
};

const assertFitBoundsOnClick = async function(testScope, assert, clickObject) {
  if (find('[data-test-button="close-route"]')) {
    await click('[data-test-button="close-route"]');
  }

  await clickMap(testScope.map, clickObject);
  await click('[data-test-button="fit-bounds"]');
  assert.ok(testScope.fitBoundsSpy.calledWith([0, 0, 1, 1]), 'it fits bounds on click layer');
};

const assertTooltips = async function(testScope, assert, layerGroupId, assertion = true) {
  const assertionMethod = assertion ? 'ok' : 'notOk';

  await hoverLayerGroup(testScope.map, layerGroupId);
  const tooltipSelector = find('[data-test-tooltip="true"]');
  assert[assertionMethod](tooltipSelector, `tooltips should be ${assertionMethod}`);
};

const assertSearchShouldFitBounds = async function(testScope, assert, routeIdentifierObject) { // eslint-disable-line
  if (find('[data-test-button="close-route"]')) {
    await click('[data-test-button="close-route"]');
  }

  testScope.server.get(`${labsSearchHost}/**`, function() {
    return [routeIdentifierObject];
  });

  await fillIn('.map-search-input', 'arbitrary test string');
  await click('.result');

  // it fits bounds on click
  // the bounding box is assumes to be the computed bounding box of the dummy
  // data, which is defined in the beforeEach
  assert.ok(testScope.fitBoundsSpy.calledWith([0, 0, 1, 1]), 'it should fit bounds on search');
};

module('Acceptance | layer behavior tests', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  // setup sinon sandbox
  hooks.before(function() {
    this.sandbox = Sinon.createSandbox();
  });

  // inject the layer group fixtures
  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  // stub the search api
  hooks.beforeEach(function() {
    this.server.get(`${labsSearchHost}/**`, function() {
      return [{ bbl: 1000477501, label: '120 Broadway, Manhattan', type: 'lot' }];
    });
  });

  // provide some spies on common mapbox calls
  hooks.beforeEach(function() {
    this.addLayerSpy = this.sandbox.spy(this.map, 'addLayer');
    this.addSourceSpy = this.sandbox.spy(this.map, 'addSource');
    this.fitBoundsSpy = this.sandbox.spy(this.map, 'fitBounds');
  });

  // refresh the local storages across tests
  hooks.beforeEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });

  hooks.beforeEach(async function() {
    await visit('/');
  });

  // reset sinon
  hooks.afterEach(function() {
    this.sandbox.restore();
  });

  test('Tax Lots', async function(assert) {
    this.server.create('lot', {
      id: 3034430054,
      properties: {
        borocode: '3',
      },
    });

    // it adds the layers when toggled or if default
    await assertLayerGroupAdded(this, assert, 'tax-lots');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: true,
      clickObject: { bbl: 1001870021, cartodb_id: 1001870021 },
      expectedURL: 'lot/1/187/21',
    });

    // it bookmarks
    await assertCanBookmark(this, assert, { bbl: 1001870021, cartodb_id: 1001870021 });

    // it tooltips
    await assertTooltips(this, assert, 'tax-lots');


    // TODO: Make this assertion work.it searches
    await assertSearchShouldFitBounds(this, assert, {
      bbl: 1001870021,
      type: 'lot',
      label: '120 Broadway, Manhattan',
    });
  });

  test('Zoning Districts', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        zonedist: '1',
        zoneaddr: 'asdf',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'zoning-districts');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { zonedist: '1', cartodb_id: '1' },
      expectedURL: 'zoning-district/1',
    });

    // TODO: Make this assertion work.
    await assertCanBookmark(this, assert, { zonedist: '1', cartodb_id: '1' });

    await assertFitBoundsOnClick(this, assert, { zonedist: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'zoning-districts', true);

    // TODO: Make this assertion work.
    await assertSearchShouldFitBounds(this, assert, {
      type: 'zoning-district',
      label: '1',
    });
  });

  test('Commercial Overlays', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        overlay: '1',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'commercial-overlays');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { overlay: '1', cartodb_id: '1' },
      expectedURL: 'commercial-overlay/1',
    });

    // TODO: Make this assertion work.
    await assertCanBookmark(this, assert, { overlay: '1', cartodb_id: '1' });

    await assertFitBoundsOnClick(this, assert, { overlay: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'commercial-overlays', true);

    // TODO: Make this assertion work.
    await assertSearchShouldFitBounds(this, assert, {
      type: 'commercial-overlay',
      label: '1',
    });
  });

  test('Zoning Map Amendments', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        ulurpno: '1',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'zoning-map-amendments');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { ulurpno: '1', cartodb_id: '1' },
      expectedURL: 'zma/1',
    });

    await assertCanBookmark(this, assert, { ulurpno: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'zoning-map-amendments', true);

    // TODO: Make this assertion work.
    await assertSearchShouldFitBounds(this, assert, {
      ulurpno: '1',
      type: 'zma',
      label: '1',
    });
  });

  test('Pending Zoning Map Amendments', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        ulurpno: '1',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'zoning-map-amendments-pending');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { ulurpno: '1', cartodb_id: '1' },
      expectedURL: 'zma/1',
    });

    await assertCanBookmark(this, assert, { ulurpno: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'zoning-map-amendments-pending', true);

    // TODO: Make this assertion work.
    await assertSearchShouldFitBounds(this, assert, {
      ulurpno: '1',
      type: 'zma',
      label: '1',
    });
  });

  test('Special Purpose Districts', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        sdlbl: '1',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'special-purpose-districts');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { sdlbl: '1', cartodb_id: '1' },
      expectedURL: 'special-purpose-district/1',
    });

    await assertCanBookmark(this, assert, { sdlbl: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'special-purpose-districts', false);

    // TODO: Make this assertion work.
    await assertSearchShouldFitBounds(this, assert, {
      type: 'special-purpose-district',
      sdname: '1',
      cartodb_id: '1',
      label: '1',
    });
  });

  test('Special Purpose Subdistricts', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '1',
      properties: {
        splbl: '1',
        cartodb_id: '1',
      },
    });

    await assertLayerGroupAdded(this, assert, 'special-purpose-subdistricts');

    await assertClickRouteBehavior(this, assert, {
      highlights: true,
      fitBounds: false,
      clickObject: { splbl: '1', cartodb_id: '1' },
      expectedURL: 'special-purpose-subdistrict/1',
    });

    await assertCanBookmark(this, assert, { splbl: '1', cartodb_id: '1' });

    await assertTooltips(this, assert, 'special-purpose-subdistricts', true);
  });

  test('Second class: Limited Height Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'limited-height-districts');

    await assertTooltips(this, assert, 'limited-height-districts', true);
  });

  test('Second class: Mandatory Inclusionary Housing Areas', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'mandatory-inclusionary-housing');

    await assertTooltips(this, assert, 'mandatory-inclusionary-housing', true);
  });

  test('Second class: Inclusionary Housing Designated Areas', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'inclusionary-housing');

    await assertTooltips(this, assert, 'inclusionary-housing', true);
  });

  test('Second class: Transit Zones', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'transit-zones');

    await assertTooltips(this, assert, 'transit-zones', true);
  });

  test('Second class: FRESH Zones', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'fresh');

    await assertTooltips(this, assert, 'fresh', true);
  });

  test('Second class: Sidewalk Cafes', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'sidewalk-cafes');

    await assertTooltips(this, assert, 'sidewalk-cafes', false);
  });

  test('Second class: Lower Density Growth Management Areas', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'low-density-growth-mgmt-areas');

    await assertTooltips(this, assert, 'low-density-growth-mgmt-areas', true);
  });

  test('Second class: Coastal Zone Boundary', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'coastal-zone-boundary');

    await assertTooltips(this, assert, 'coastal-zone-boundary', true);
  });

  test('Second class: Waterfront Access Plan', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'waterfront-access-plan');

    await assertTooltips(this, assert, 'waterfront-access-plan', true);
  });

  test('Second class: Historic Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'historic-districts');

    await assertTooltips(this, assert, 'historic-districts', true);
  });

  test('Second class: Landmarks', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'landmarks');

    await assertTooltips(this, assert, 'landmarks', true);
  });

  test('Second class: Effective Flood Insurance Rate Maps 2007', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'floodplain-efirm2007');

    await assertTooltips(this, assert, 'floodplain-efirm2007', true);
  });

  test('Second class: Preliminary Flood Insurance Rate Maps 2015', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'floodplain-pfirm2015');

    await assertTooltips(this, assert, 'floodplain-pfirm2015', true);
  });

  test('Second class: Environmental Designations', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'e-designations');

    await assertTooltips(this, assert, 'e-designations', true);
  });

  test('Second class: Appendix J Designated M Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'appendixj-designated-mdistricts');

    await assertTooltips(this, assert, 'appendixj-designated-mdistricts', true);
  });

  test('Second class: Business Improvement Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'business-improvement-districts');

    await assertTooltips(this, assert, 'business-improvement-districts', true);
  });

  test('Second class: Industrial Business Zones', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'industrial-business-zones');

    await assertTooltips(this, assert, 'industrial-business-zones', true);
  });

  test('Second class: Boroughs', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'boroughs');

    await assertTooltips(this, assert, 'boroughs', false);
  });

  test('Second class: Community Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'community-districts');

    await assertTooltips(this, assert, 'community-districts', false);
  });

  test('Second class: NYC Council Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'nyc-council-districts-combined');

    await assertTooltips(this, assert, 'nyc-council-districts-combined', false);
  });

  test('Second class: NY State Senate Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'ny-senate-districts');

    await assertTooltips(this, assert, 'ny-senate-districts', false);
  });

  test('Second class: NY State Assembly Districts', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'assembly-districts');

    await assertTooltips(this, assert, 'assembly-districts', false);
  });

  test('Second class: Neighborhood Tabulation Areas', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'neighborhood-tabulation-areas');

    await assertTooltips(this, assert, 'neighborhood-tabulation-areas', false);
  });

  test('Second class: Subways', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'subway');

    await assertTooltips(this, assert, 'subway', false);
  });

  test('Second class: Building Footprints', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'building-footprints');

    await assertTooltips(this, assert, 'building-footprints', false);
  });

  test('Second class: 3D Buildings', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'three-d-buildings');

    await assertTooltips(this, assert, 'three-d-buildings', false);
  });

  test('Second class: Aerial Imagery', async function(assert) {
    await assertLayerGroupAdded(this, assert, 'aerials');

    await assertTooltips(this, assert, 'aerials', false);
  });
});
