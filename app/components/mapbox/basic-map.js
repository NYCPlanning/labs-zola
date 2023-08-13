import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { buildWaiter } from '@ember/test-waiters';

const waiter = buildWaiter('ember-friendz:friend-waiter');

/**
 *
 * Wrapping interface for all mapbox-gl/"labs-map" maps in the app. mapbox-gl
 * component should never be used directly.
 *
 */
@tagName('')
export default class MapboxBasicMapComponent extends Component {
  token = waiter.beginAsync();

  // used internally for testing. tells the test suite
  // to wait until the map has loaded before proceeding
  @action
  _mapIsLoaded() {
    return !!this.mapInstance;
  }

  // "legacy" properties passed into "labs-map"
  name = '';

  layerGroups = [];

  initOptions = {};

  mapLoaded = () => {};

  mapInstance = null;

  @action
  handleMapLoaded(e) {
    this.mapInstance = e;

    this.mapLoaded(this.mapInstance);
    waiter.endAsync(this.token);
  }
}
