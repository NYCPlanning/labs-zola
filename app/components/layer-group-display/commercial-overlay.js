import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import bbox from '@turf/bbox';

export default class LayerGroupDisplayCommercialOverlayComponent extends Component {
  @service
  mainMap;

  @computed('model.value.geometry')
  get bounds() {
    const geometry = this.get('model.value.geometry');

    return bbox(geometry);
  }

  @action
  fitBounds() {
    this.get('mainMap.setBounds').perform();
  }
}
