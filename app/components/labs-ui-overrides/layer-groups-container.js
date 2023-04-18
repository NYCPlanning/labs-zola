import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import LayerGroupsContainer from '@nycplanning/ember/components/deprecated/layer-groups-container';

export default LayerGroupsContainer.extend({
  fastboot: service(),
  init(...args) {
    this._super(...args);

    this.set('layerGroupToggleItems', A([]));
  },
  handleToggle() {},
});
