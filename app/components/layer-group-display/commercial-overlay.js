import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LayerGroupDisplayCommercialOverlayComponent extends Component {
  @service
  mainMap;

  @action
  fitBounds() {
    this.get('mainMap.setBounds').perform();
  }
}
