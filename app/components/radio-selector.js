import Ember from 'ember';
import { set } from '@ember/object';
import { copy } from '@ember/object/internals';
import { merge } from '@ember/polyfills';
// import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend({
  layers: [],
  actions: {
    switchLayer(id, mainToggle = false) {
      const layers = this.get('layers');

      const targetLayerIndex = layers.findIndex(el => el.layer.id === 'aerials-1924-raster');
      const targetLayer = layers.objectAt(targetLayerIndex);
      const copyTargetLayer = copy(targetLayer, true);
      copyTargetLayer.layer.layout = merge(copyTargetLayer.layer.layout, { visibility: 'visible' });
      set(targetLayer, 'layer', copyTargetLayer.layer);
      // const formattedYear = `aerials-${year}`;
      // const propNames = aerialYears.map(aYear => `aerials-${aYear}`);
      // const qps = this.get('qps');
      // const isAnyLayerSelected = propNames.any(prop => qps.get(prop));
      //
      // // turn off all aerial layers
      // propNames.forEach((aerialYear) => {
      //   qps.set(aerialYear, false);
      // });
      //
      // // if it's the main switch and any are visible, turn them all off
      // // otherwise, switch to the selected aerial
      // if (!(mainToggle && isAnyLayerSelected)) {
      //   qps.toggleProperty(formattedYear);
      // }
    },
  },
});
