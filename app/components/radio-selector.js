import Ember from 'ember';
import { set } from '@ember/object';
import { copy } from '@ember/object/internals';
import { merge } from '@ember/polyfills';

const hideLayer = (layer) => {
  const layerCopy = copy(layer, true);
  layerCopy.layer.layout = merge(layerCopy.layer.layout, { visibility: 'none' });
  set(layer, 'layer', layerCopy.layer);
};

const showLayer = (layer) => {
  const layerCopy = copy(layer, true);
  layerCopy.layer.layout = merge(layerCopy.layer.layout, { visibility: 'visible' });
  set(layer, 'layer', layerCopy.layer);
};


export default Ember.Component.extend({
  layers: [],
  qps: null,
  actions: {
    switchLayer(id) {
      const layers = this.get('layers');
      const qps = this.get('qps');

      // turn all layers off, reset query params
      layers.forEach((layer) => {
        // show the selected layer
        if (layer.layer.id === id) {
          showLayer(layer);

          qps.set(layer.layer.id, true);
        } else { // hide all other layers
          hideLayer(layer);

          qps.set(layer.layer.id, false);
        }
      });
    },
  },
});
