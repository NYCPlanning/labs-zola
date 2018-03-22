import Service from '@ember/service';
import pointLayer from '../layers/point-layer';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const DEFAULT_BOUNDS = [-73.9, 40.690913, -73.832692, 40.856654];

export default Service.extend({
  mapInstance: null,

  // currently selected lot, usually a Lot model
  selected: null,
  currentZoom: null,
  currentMeasurement: null,
  drawMode: null,
  shouldFitBounds: false,

  @computed('selected')
  bounds(selected) {
    const mapInstance = this.get('mapInstance');
    if (mapInstance) {
      mapInstance.resize();
    }

    if (selected) {
      return selected.get('bounds');
    }
    return DEFAULT_BOUNDS;
  },

  pointLayer,
  currentAddress: null,

  drawnFeature: null,

  @computed('drawnFeature')
  drawnFeatureSource(feature) {
    return {
      type: 'geojson',
      data: feature,
    };
  },


  @computed('currentAddress')
  addressSource(currentAddress) {
    return {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: currentAddress,
      },
    };
  },

  @computed('selected')
  isSelectedBoundsOptions(selected) {
    const el = $('.map-container');
    const height = el.height();
    const width = el.width();

    const fullWidth = window.innerWidth;
    // width of content area on large screens is 5/12 of full
    const contentWidth = (fullWidth / 12) * 5;
    // on small screens, no offset
    const offset = fullWidth < 1024 ? 0 : -((width - contentWidth) / 2);
    const padding = Math.min(height, (width - contentWidth)) / 2.5;

    // get type of selected feature so we can do dynamic padding
    const type = selected ? selected.constructor.modelName : null;

    return {
      padding: selected && (type !== 'zoning-district') && (type !== 'commercial-overlay') ? padding : 0,
      offset: [offset, 0],
    };
  },

  resetBounds() {
    const mapInstance = this.get('mapInstance');
    if (mapInstance) {
      mapInstance.resize();
    }
    this.set('selected', null);
  },
});
