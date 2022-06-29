import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import LayerGroupsContainer from 'labs-ui/components/labs-ui/layer-groups-container';

export default class ZolaLayerGroupsContainer extends LayerGroupsContainer {
  layerGroupToggleItems = A([]);

  @service
  fastboot;

  handleToggle = () => {}
}
