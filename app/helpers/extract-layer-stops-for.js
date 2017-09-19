import Ember from 'ember';

const { get } = Ember;

export function extractLayerStopsFor([id, layerConfig]) {
  if (!layerConfig.layers) return layerConfig;
  return get(
    layerConfig.layers.findBy('layer.id', id),
    'layer.paint.fill-color.stops',
  );
}

export default Ember.Helper.helper(extractLayerStopsFor);
