import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { registerWaiter, unregisterWaiter } from '@ember/test';

/**
 *
 * Wrapping interface for all mapbox-gl/"labs-map" maps in the app. mapbox-gl
 * component should never be used directly.
 *
 */
@tagName('')
export default class MapboxBasicMapComponent extends Component {
  init(...args) {
    super.init(...args);

    registerWaiter(this._mapIsLoaded);
  }

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

  mapLoaded = () => {}

  mapInstance = null;

  @action
  handleMapLoaded(e) {
    this.mapInstance = e;

    this.mapLoaded(this.mapInstance);
  }

  willDestroyElement() {
    unregisterWaiter(this._mapIsLoaded);
  }
}
