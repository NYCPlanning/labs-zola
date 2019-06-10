import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import stubBasicMap from '../../helpers/stub-basic-map';
import layerGroupsFixtures from '../../../mirage/static-fixtures/layer-groups';

module('Integration | Component | layer-palette', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.set('myAction', function(val) { ... });

  hooks.beforeEach(function() {
    this.server.get('layer-groups', () => layerGroupsFixtures);
  });

  test('toggling the Show Land Use Colors checkbox in the layer-palette changes the visibility', async function(assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroupsObject = this.layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    await render(hbs`
      {{layer-palette
        layerGroups=this.layerGroupsObject
        isDefault=isDefault
      }}
    `);

    await click('[data-test-layer-option="land-use-checkbox"]');

    const taxLots = this.layerGroupsObject['tax-lots'];
    assert.equal(taxLots.visible, true);
    assert.equal(taxLots.layers.findBy('id', 'pluto-fill').paint['fill-opacity'], 0.5);
  });

  test('toggling the zoning type checkboxes under Zoning Districts in the layer palette changes which district types are shown', async function(assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroupsObject = this.layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    this.selectedZoning = [];

    await render(hbs`
      {{layer-palette
        selectedZoning=selectedZoning
        layerGroups=this.layerGroupsObject
      }}
    `);

    await click('[data-test-grouped-parent="Commercial Districts"]');

    const zoningDistricts = this.layerGroupsObject['zoning-districts'];

    assert.deepEqual(
      zoningDistricts.layers.findBy('id', 'zd-fill').style.filter,
      ['any', ['==', 'primaryzone', 'C1'], ['==', 'primaryzone', 'C2'], ['==', 'primaryzone', 'C3'], ['==', 'primaryzone', 'C4'], ['==', 'primaryzone', 'C5'], ['==', 'primaryzone', 'C6'], ['==', 'primaryzone', 'C7'], ['==', 'primaryzone', 'C8']],
    );
  });

  test('toggling the commercial overlay type checkboxes under Commercial Overlays in the layer palette changes which types are shown', async function(assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroupsObject = this.layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    this.selectedOverlays = [];

    await render(hbs`
      {{layer-palette
        selectedOverlays=selectedOverlays
        layerGroups=this.layerGroupsObject
      }}
    `);

    await click('[data-test-grouped-parent="C1-1 through C1-5"]');

    const commercialOverlays = this.layerGroupsObject['commercial-overlays'];

    assert.deepEqual(
      commercialOverlays.layers.findBy('id', 'co').style.filter,
      ['any', ['==', 'overlay', 'C1-1'], ['==', 'overlay', 'C1-2'], ['==', 'overlay', 'C1-3'], ['==', 'overlay', 'C1-4'], ['==', 'overlay', 'C1-5']],
    );
  });

  test('toggling aerials changes the year shown', async function(assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroupsObject = this.layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    await render(hbs`
      {{layer-palette
        layerGroups=this.layerGroupsObject
        isDefault=isDefault
      }}
    `);

    await click('[data-test-toggle-aerials] .layer-group-toggle-label');
    const aerialsLayer = this.layerGroupsObject.aerials;
    assert.equal(aerialsLayer.visible, true); // check that toggling the layer makes it visible

    await click('[data-test-radio="aerials-2008"]');
    assert.equal(aerialsLayer.layers.findBy('id', 'aerials-2008').visibility, true); // clicking on the new radio button changes the visibility
  });

  // reset map button is broken as of now, will fix in another branch and return to this test
  skip('clicking reset map button resets to all of default layers', async function(assert) {
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });

    this.layerGroupsObject = this.layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    this.selectedOverlays = [];
    this.selectedZoning = [];

    await render(hbs`
      {{layer-palette
        selectedZoning=selectedZoning
        selectedOverlays=selectedOverlays
        layerGroups=this.layerGroupsObject
        isDefault=isDefault
      }}
    `);

    await click('[data-test-grouped-parent="Commercial Districts"]'); // under Zoning Districts
    await click('[data-test-grouped-parent="C1-1 through C1-5"]'); // under Commercial Overlays
    await click('[data-test-toggle-aerials] .layer-group-toggle-label'); // Aerial Imagery
    const zoningDistricts = this.layerGroupsObject['zoning-districts'];
    const commercialOverlays = this.layerGroupsObject['commercial-overlays'];
    const aerialsLayer = this.layerGroupsObject.aerials;

    await click('[data-test-reset-map-button]');
    await pauseTest();
    assert.deepEqual(zoningDistricts.layers.findBy('id', 'zd-fill').style.filter, []); // reset to none
    assert.deepEqual(commercialOverlays.layers.findBy('id', 'co').style.filter, []); // reset to none
    assert.equal(aerialsLayer.visible, false); // toggle to false
  });
});
