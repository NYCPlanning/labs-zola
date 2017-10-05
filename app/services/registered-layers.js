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
  layerGroupIds(layers) {
    return layers.mapBy('config.id');
  },

  @computed('layers.@each')
  layerIds(layers) {
    return flattenedIds(layers);
  },

  @computed('currentlyVisible')
  visibleLayerIds(layers) {
    return flattenedIds(layers);
  },

  @computed('currentlyVisible')
  highlightableAndVisibleLayerIds(layers) {
    // return an array of layerids that are both visible and highlightable
    return layers
      .map(layer => layer.config.layers.filter(l => l.highlightable).map(l => l.layer.id))
      .reduce(
        (accumulator, curr) => (accumulator.concat(curr)),
        [],
      );
  },

  @computed('currentlyVisible')
  clickableAndVisibleLayerIds(layers) {
    // return an array of layerids that are both visible and highlightable
    return layers
      .map(layer => layer.config.layers.filter(l => l.clickable).map(l => l.layer.id))
      .reduce(
        (accumulator, curr) => (accumulator.concat(curr)),
        [],
      );
  },

  getTooltipTemplate(id) {
    // find the layer with this id, return its tooltipTemplate
    const layer = this.get('layers').reduce(
      (accumulator, curr) => {
        const match = curr.config.layers.filter(l => l.layer.id === id);
        return match.length > 0 ? accumulator.concat(match[0]) : accumulator;
      },
      [],
    )[0];

    return layer.tooltipTemplate;
  },

  findLayer(id) {
    return this.get('layers').findBy('config.id', id);
  },
});
