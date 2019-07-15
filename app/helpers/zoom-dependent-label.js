import Helper from '@ember/component/helper';

export default Helper.extend({

  compute([layerGroup, label, mapZoom]) {
    const allMinzooms = layerGroup.layers.map((layer) => {
      if (layer.style) {
        return layer.style.minzoom;
      }
      return false;
    }).filter(zoom => !!zoom);
    const maxOfallMinzooms = (allMinzooms.length) ? Math.max(...allMinzooms) : false;
    return (mapZoom < maxOfallMinzooms) ? label : null;
  },

});
