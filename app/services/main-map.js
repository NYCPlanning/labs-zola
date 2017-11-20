import Ember from 'ember';
import pointLayer from '../layers/point-layer';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const DEFAULT_BOUNDS = [-74.077644, 40.690913, -73.832692, 40.856654];

export default Ember.Service.extend({
  mapInstance: null,

  // currently selected lot, usually a Lot model
  selected: null,
  currentZoom: null,
  currentMeasurement: null,
  isDrawing: false,
  shouldFitBounds: true,

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

  resetBounds() {
    const mapInstance = this.get('mapInstance');
    if (mapInstance) {
      mapInstance.resize();
    }
    this.set('selected', null);
  },
});
