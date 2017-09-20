import Ember from 'ember';

const { set, get } = Ember;

export default function replacePaintStyleIn(config, layerId, newPaintStyle) {
  if (!config) return {};
  const layers = get(config, 'layers');
  const targetLayerIndex = layers.findIndex(el => el.layer.id === layerId);
  const targetLayer = layers.objectAt(targetLayerIndex);
  set(targetLayer, 'layer.paint', newPaintStyle);
  return config;
}
