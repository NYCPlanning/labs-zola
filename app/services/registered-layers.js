import Service from '@ember/service';
import { computed } from '@ember-decorators/object';

const flattenedIds = function(layers) {
  return layers
    .map(layer => layer.config.layers.mapBy('layer.id'))
    .reduce(
      (accumulator, curr) => (accumulator.concat(curr)),
      [],
    );
};

export default class RegisteredLayersService extends Service {
  layers = [];

  @computed('layers.@each.visible')
  get currentlyVisible() {
    const layers = this.get('layers');
    return layers.filterBy('visible', true);
  }

  @computed('layers.@each')
  get layerGroupIds() {
    const layers = this.get('layers');
    return layers.mapBy('config.id');
  }

  @computed('layers.@each')
  get layerIds() {
    const layers = this.get('layers');
    return flattenedIds(layers);
  }

  @computed('currentlyVisible')
  get visibleLayerIds() {
    const layers = this.get('currentlyVisible');
    return flattenedIds(layers);
  }

  @computed('currentlyVisible')
  get highlightableAndVisibleLayerIds() {
    const layers = this.get('currentlyVisible');
    // return an array of layerids that are both visible and highlightable
    return layers
      .map(layer => layer.config.layers.filter(l => l.highlightable).map(l => l.layer.id))
      .reduce(
        (accumulator, curr) => (accumulator.concat(curr)),
        [],
      );
  }

  @computed('currentlyVisible')
  get clickableAndVisibleLayerIds() {
    const layers = this.get('currentlyVisible');
    // return an array of layerids that are both visible and clickable
    return layers
      .map(layer => layer.config.layers.filter(l => l.clickable).map(l => l.layer.id))
      .reduce(
        (accumulator, curr) => (accumulator.concat(curr)),
        [],
      );
  }

  getTooltipTemplate(id) {
    // find the layer with this id, return its tooltipTemplate
    const layer = this.layers.reduce(
      (accumulator, curr) => {
        const match = curr.config.layers.filter(l => l.layer.id === id);
        return match.length > 0 ? accumulator.concat(match[0]) : accumulator;
      },
      [],
    )[0];

    return layer.tooltipTemplate;
  }

  findLayer(id) {
    return this.layers.findBy('config.id', id);
  }
}
