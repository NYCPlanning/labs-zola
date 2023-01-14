import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

module('Acceptance | visual diff routes', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting lot/1/187/21', async function(assert) {
    this.server.create('lot', {
      id: 1001870021,
      properties: {
        address: '32 WEST 25 STREET',
        bldgarea: 5000,
        bldgclass: 'K1',
        borocode: '1',
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
      },
    });

    await visit('lot/1/187/21');

    assert.ok(true);
  });

  test('visiting zoning-district/R3-2', async function(assert) {
    this.server.create('carto-geojson-feature', {
      properties: {
        id: 'R3-2',
        zonedist: 'R3-2',
      },
    });

    await visit('zoning-district/R3-2');

    assert.ok(true);
  });

  test('visiting commercial-overlay/C2-5', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: 'C2-5',
      properties: {
        id: 'C2-5',
        overlay: 'C2-5',
        address: null,
      },
    });

    await visit('commercial-overlay/C2-5');

    assert.ok(true);
  });

  test('visiting zma/090334zmk', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: '090334zmk',
      properties: {
        id: '090334zmk',
        ulurpno: '090334zmk',
        project_na: 'GREENPOINT-WILLIAMSBURG',
        effective: '2005-05-11T00:00:00Z',
        status: 'Adopted',
        lucats: '050111a',
        address: '090334zmk',
      },
    });

    await visit('zma/090334zmk');

    assert.ok(true);
  });

  test('visiting special-purpose-district/1', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: 1,
      properties: {
        id: 1,
        sdlbl: 'MiD',
        sdname: 'Special Midtown District',
      },
    });

    await visit('special-purpose-district/1');

    assert.ok(true);
  });

  test('visiting special-purpose-subdistrict/96', async function(assert) {
    this.server.create('carto-geojson-feature', {
      id: 96,
      properties: {
        id: 96,
        splbl: 'LIC',
        spname: 'Special Long Island City Mixed Use District',
      },
    });

    await visit('special-purpose-subdistrict/96');

    assert.ok(true);
  });
});
