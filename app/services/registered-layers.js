import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const flattenedIds = function(layers) {
  return layers
    .map(layer => layer.config.layers.mapBy('layer.id'))
    .reduce(
      (accumulator, curr) => (accumulator.concat(curr)),
      [],
    );
};

export default Ember.Service.extend({
  layers: [],

  @computed('layers.@each.visible')
  currentlyVisible(layers) {
    return layers.filterBy('visible', true);
  },

  @computed('layers.@each')
  layerIds(layers) {
    return flattenedIds(layers);
  },

  @computed('currentlyVisible')
  visibleLayerIds(layers) {
    return flattenedIds(layers);
  },

  findLayer(id) {
    return this.get('layers').filterBy('config.id', id);
  },
});
