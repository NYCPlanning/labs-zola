import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function extractLayerStopsFor([id, layerConfig]) {
  if (!layerConfig.layers) return layerConfig;
  return get(
    layerConfig.layers.findBy('layer.id', id),
    'layer.paint.fill-color.stops',
  );
}

export default helper(extractLayerStopsFor);
