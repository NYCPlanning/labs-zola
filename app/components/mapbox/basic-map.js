import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
/**
 *
 * Wrapping interface for all mapbox-gl/"labs-map" maps in the app. mapbox-gl
 * component should never be used directly.
 *
 */
@tagName('')
export default class MapboxBasicMapComponent extends Component {
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
}
