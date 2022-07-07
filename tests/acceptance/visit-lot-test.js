import { currentURL, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

// this is a true acceptance, just make sure it works
module('Acceptance | visit lot', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('visiting a lot', async function(assert) {
    this.server.create('lot', {
      id: 1016320001,
    });

    await visit('/l/lot/1/1632/1');

    assert.notEqual(find('.content-area').textContent.length, 0);
  });

  test('visiting a bbl', async function(assert) {
    this.server.create('lot', {
      id: 1001870021,
    });

    await visit('/bbl/1001870021');

    assert.equal(currentURL(), '/l/lot/1/187/21');
    assert.notEqual(find('.content-area').textContent.length, 0);
  });

  test('visiting a lot with special purpose districts', async function(assert) {
    this.server.create('lot', {
      id: 1001870021,
    });

    this.server.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
      const { queryParams } = request;
      const { format, q } = queryParams;

      // by default, this will return a feature that looks like a PLUTO Lot
      if (format === 'geojson') {
        // by default, return anything created in this schema
        let schemaModel = schema.cartoGeojsonFeatures.all();

        // if it includes mappluto, it's asking for lots
        if (q.includes('mappluto')) {
          schemaModel = schema.lots.all();
        }

        const { models: features } = schemaModel;

        return {
          type: 'FeatureCollection',
          features,
        };
      }

      if (q.includes('special_purpose_districts')) {
        return {
          rows: [{
            sdname: 'Special Grand Concourse Preservation District',
            sdlbl: 'test',
          }],
        };
      }

      return { rows: [] };
    });

    await visit('/bbl/1001870021');

    assert.ok(find('[data-test-special-district]'));
  });
});
