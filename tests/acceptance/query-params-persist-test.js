import { module, test } from 'qunit';
import {
  visit,
  // currentURL,
  // click,
  find,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import config from 'labs-zola/config/environment';
import { setupMirage } from 'ember-cli-mirage/test-support';
import mockLayersAPI from '../helpers/mock-layers-api';

const { defaultLayerGroupState } = config;

const defaultVisible = defaultLayerGroupState
  .filter(({ visible }) => visible)
  .map(({ id }) => id);

const defaultNonVisible = defaultLayerGroupState
  .filter(({ visible }) => !visible)
  .map(({ id }) => id);


module('Acceptance | query params persist', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  mockLayersAPI(hooks);

  test('Navigating without layer group QPs shows default layers on, redirects', async function(assert) {
    await visit('/');
    await percySnapshot(assert);

    // loop over and check each one, seeing if it's toggled in DOM
    defaultVisible.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      // some layer groups may be visible in the map but not
      // selectable in layer palette
      if (selectedToggle) {
        assert.equal(selectedToggle.checked, true);
      }
    });
  });

  test('QPs containing non-default of same length are toggled on', async function(assert) {
    // get the non-default params, but only the same number as default
    const testParams = defaultNonVisible.slice(0, defaultVisible.length - 1);

    await visit(`/about?layer-groups=[${testParams.map(l => `"${l}"`)}]`);
    await percySnapshot(assert);

    // loop over and check each one, seeing if it's toggled in DOM
    testParams.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, true);
      }
    });

    // loop over and check each one, seeing if it's NOT toggled
    defaultVisible.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, false);
      }
    });
  });

  test('layer group QP length is greater than # of default layer groups', async function(assert) {
    // get the non-default params, but only the same number as default
    const testParams = defaultNonVisible.slice(0, defaultVisible.length + 1);

    await visit(`/about?layer-groups=[${testParams.map(l => `"${l}"`)}]`);
    await percySnapshot(assert);

    // loop over and check each one, seeing if it's toggled in DOM
    testParams.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, true);
      }
    });

    // loop over and check each one, seeing if it's NOT toggled
    defaultVisible.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, false);
      }
    });
  });

  test('layer group QP length is less than # of default layer groups', async function(assert) {
    // get the non-default params, but only the same number as default
    const testParams = defaultNonVisible.slice(0, defaultVisible.length - 2);

    await visit(`/about?layer-groups=[${testParams.map(l => `"${l}"`)}]`);
    await percySnapshot(assert);

    // loop over and check each one, seeing if it's toggled in DOM
    testParams.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, true);
      }
    });

    // loop over and check each one, seeing if it's NOT toggled
    defaultVisible.forEach((id) => {
      const selectedToggle = find(`[data-test-toggle-${id}] input`);

      if (selectedToggle) {
        assert.equal(selectedToggle.checked, false);
      }
    });
  });
});
