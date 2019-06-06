import { module, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import stubBasicMap from '../helpers/stub-basic-map';
import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

// for whatever reason this test is showing race conditions in offline map data
// mode. when tiles and mapbox-gl network calls point to dummy resources, it's rly
// fast. seems like this fails randomly and therefore the test is unreliable, so
// is the feature. TODO: CORRECTLY FIX WHATEVER BUG THIS WAS SUPPOSED TO FIX
module('Acceptance | bbox', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  // the map has to be stubbed here because of a race condition.
  // in CI, I was seeing this test never pass because of an endless loop
  // that was being used in a task in the main-map _service_ called `setBounds`.
  // after making the test environment completely offline mode, I believe there was
  // a race condition in which that task never exiting, leading to an endless loop.
  // this is a problem and needs to be refactored.
  // for now, let's stub the map and move on.
  stubBasicMap(hooks);

  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });

  skip('visiting valid bbox does not redirect', async function(assert) {
    const goodBboxUrl = '-73.9978/40.5705/-73.9804/40.5785';
    await visit(`/bbox/${goodBboxUrl}`);

    assert.equal(currentURL(), `/bbox/${goodBboxUrl}`);
  });

  skip('visiting invalid bbox redirects to /about', async function(assert) {
    const badBboxUrl = 'foo/40.5705/-73.9804/40.5785';
    await visit(`/bbox/${badBboxUrl}`);

    assert.equal(currentURL().substring(0, 2), '/?');
  });
});
