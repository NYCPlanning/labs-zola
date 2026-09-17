import { service } from '@ember/service';
import LayerGroupsContainer from '@nycplanning/ember/components/deprecated/layer-groups-container';
import { tracked } from '@glimmer/tracking';

export default class LayerGroupsContainerComponent extends LayerGroupsContainer {
  get fastboot() {
    return service();
  }

  @tracked layerGroupToggleItems = [];

  handleToggle() {}
}
