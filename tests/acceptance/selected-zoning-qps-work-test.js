import { module, test } from 'qunit';
import {
  visit,
  click,
  find,
  currentURL,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import extractQueryParams from '../helpers/extract-query-params';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';


module('Acceptance | selected zoning qps work', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  test('Selected zoning QPs are applied', async function(assert) {
    const zoning = ['BP', 'C1', 'C2', 'C3',
      'C4', 'C6', 'C8', 'M1',
      'M2', 'M3', 'PA', 'R1',
      'R10', 'R2', 'R3', 'R4',
      'R5', 'R6', 'R7', 'R8',
      'R9'];

    const overlays = ['C1-2', 'C1-4', 'C2-1', 'C2-2', 'C2-3', 'C2-4', 'C2-5', 'C1-5', 'C1-3'];

    await visit(`/about?selectedZoning=[${zoning.map(z => `"${z}"`)}]&selectedOverlays=[${overlays.map(o => `"${o}"`)}]`);

    const selectors = {
      c7: await find('[data-test-grouped="C7"'),
      c5: await find('[data-test-grouped="C5"'),
      coC11: await find('[data-test-grouped="C1-1"'),
    };

    assert.equal(selectors.c7.checked, false);
    assert.equal(selectors.c5.checked, false);
    assert.equal(selectors.coC11.checked, false);
  });

  test('Can click and URL updates', async function(assert) {
    const zoning = ['BP', 'C1', 'C2', 'C3',
      'C4', 'C6', 'C8', 'M1',
      'M2', 'M3', 'PA', 'R1',
      'R10', 'R2', 'R3', 'R4',
      'R5', 'R6', 'R7', 'R8',
      'R9'];

    const overlays = ['C1-1', 'C1-2', 'C1-4', 'C2-1', 'C2-2', 'C2-3', 'C2-4', 'C2-5', 'C1-5', 'C1-3'];

    await visit(`/about?selectedZoning=[${zoning.map(z => `"${z}"`)}]&selectedOverlays=[${overlays.map(o => `"${o}"`)}]`);
    await click('[data-test-grouped="C8"]');
    await click('[data-test-grouped="C1-1"]');

    const { selectedZoning, selectedOverlays } = extractQueryParams(currentURL());

    assert.ok(!selectedZoning.includes('C8') && !selectedOverlays.includes('C1-1'));
  });

  test('URL params persist across route transitions', async function(assert) {
    const zoning = ['BP', 'C1', 'C2', 'C3',
      'C4', 'C6', 'C8', 'M1',
      'M2', 'M3', 'PA', 'R1',
      'R10', 'R2', 'R3', 'R4',
      'R5', 'R6', 'R7', 'R8',
      'R9'];

    const overlays = ['C1-1', 'C1-2', 'C1-4', 'C2-1', 'C2-2', 'C2-3', 'C2-4', 'C2-5', 'C1-5', 'C1-3'];

    await visit(`/about?selectedZoning=[${zoning.map(z => `"${z}"`)}]&selectedOverlays=[${overlays.map(o => `"${o}"`)}]`);
    await click('.features-header-link');

    const { selectedZoning, selectedOverlays } = extractQueryParams(currentURL());

    assert.ok(selectedZoning.every(z => zoning.any(s => z === s)));
    assert.ok(selectedOverlays.every(o => overlays.any(t => t === o)));
  });
});
