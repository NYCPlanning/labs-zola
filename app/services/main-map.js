import Service from '@ember/service';
import { computed } from '@ember/object';
import { timeout, task } from 'ember-concurrency';

const DEFAULT_ZOOM = 9.72;
const DEFAULT_LNG = 40.7125;
const DEFAULT_LAT = -73.733;
const DEFAULT_LAT_OFFSET = -0.1692;

export default class MainMapService extends Service {
  mapInstance = null;

  // selected feature; always a geometric type model
  // includes bounds
  // used to determine how to zoom
  selected = null;

  currentMeasurement = null;

  drawMode = null;

  shouldFitBounds = false;

  routeIntentIsNested = false;

  zoom = DEFAULT_ZOOM;

  knownHashIntent = '';

  @computed
  get parsedHash() {
    if (this.knownHashIntent) {
      return this.knownHashIntent.replace('#', '').split('/').reverse();
    }

    return [9.72, 40.7125, -73.733];
  }

  @computed
  get center() {
    if (this.knownHashIntent) {
      const [x, y] = this.parsedHash;
      return [x, y];
    }

    const boundsOptions = this.isSelectedBoundsOptions;
    const x = (boundsOptions.offset[0] === 0) ? (DEFAULT_LAT + DEFAULT_LAT_OFFSET) : DEFAULT_LAT;

    return [x, DEFAULT_LNG];
  }

  @computed('selected', 'routeIntentIsNested')
  get isSelectedBoundsOptions() {
    const selected = this.get('selected');
    const el = document.querySelector('.map-container');
    const height = el.offsetHeight;
    const width = el.offsetWidth;
    const routeIntentIsNested = this.get('routeIntentIsNested');

    const fullWidth = window.innerWidth;
    // width of content area on large screens is 5/12 of full
    const contentWidth = (fullWidth / 12) * 5;
    // on small screens, no offset
    const offset = fullWidth < 1024 ? 0 : -((width - contentWidth) / 2) / 2;
    const padding = Math.min(height, (width - contentWidth)) / 2.5;

    // get type of selected feature so we can do dynamic padding
    const type = selected ? selected.constructor.modelName : null;

    const options = {
      ...(routeIntentIsNested ? { duration: 0 } : {}),
      padding: selected && (type !== 'zoning-district') && (type !== 'commercial-overlay') ? padding : 0,
      offset: [offset, 0],
    };

    return options;
  }

  @task(function* (explicitBounds) {
    const bounds = explicitBounds || this.get('bounds');
    while (!this.get('mapInstance')) {
      yield timeout(100);
    }

    const mapInstance = this.get('mapInstance');

    mapInstance.fitBounds(bounds, this.get('isSelectedBoundsOptions'));
    this.set('routeIntentIsNested', false);
  })
  setBounds
}
