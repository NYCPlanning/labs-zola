import { A } from '@ember/array';
import LayerGroupsContainer from 'labs-ui/components/labs-ui/layer-groups-container';
import layout from 'labs-ui/templates/components/labs-ui/layer-groups-container';

export default LayerGroupsContainer.extend({
  init(...args) {
    this._super(...args);

    this.set('layerGroupToggleItems', A([]));
  },
  layout,
  handleToggle() {},
});
