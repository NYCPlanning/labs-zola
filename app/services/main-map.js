import Service from '@ember/service';
import { computed } from '@ember/object';
import { timeout, task } from 'ember-concurrency';
import pointLayer from '../layers/point-layer';

const DEFAULT_BOUNDS = [-73.9, 40.690913, -73.832692, 40.856654];

export default class MainMapService extends Service {
  mapInstance = null;

  // selected feature; always a geometric type model
  // includes bounds
  // used to determine how to zoom
  selected = null;

  currentMeasurement = null;

  drawMode = null;

  shouldFitBounds = false;

  // computed from the selected
  @computed('selected', 'selected.bounds')
  get bounds() {
    const selected = this.get('selected');
    const { mapInstance } = this;
    if (mapInstance) {
      mapInstance.resize();
    }

    if (selected) {
      return selected.get('bounds');
    }
    return DEFAULT_BOUNDS;
  }

  pointLayer = pointLayer;

  currentAddress = null;

  routeIntentIsNested = false;

  @computed('currentAddress')
  get addressSource() {
    const currentAddress = this.get('currentAddress');
    return {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: currentAddress,
      },
    };
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

  resetBounds() {
    const { mapInstance } = this;
    if (mapInstance) {
      mapInstance.resize();
    }
    this.set('selected', null);
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
