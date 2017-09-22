import Ember from 'ember';

const DEFAULT_BOUNDS = [-74.077644, 40.690913, -73.832692, 40.856654];
const { computed } = Ember;

export default Ember.Service.extend({
  mapInstance: null,
  
  // currently selected lot, usually a Lot model
  selected: null,
  bounds: computed('selected', function() {
    const selected = this.get('selected');
    if (selected) {
      return selected.get('bounds');
    }
    return DEFAULT_BOUNDS;
  }),
  resetBounds() {
    this.set('selected', null);
  },
});
