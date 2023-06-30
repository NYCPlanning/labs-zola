import Helper from '@ember/component/helper';

export default Helper.extend({

  compute([layerGroup, label, mapZoom]) {
    const largestMinZoom = layerGroup.get('largestMinZoom');
    if (typeof largestMinZoom !== 'number') {
      return null;
    }
    return (mapZoom < largestMinZoom) ? label : null;
  },

});
