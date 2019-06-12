import Component from '@ember/component';
import { computed } from '@ember/object';
import bbox from '@turf/bbox';
import { inject as service } from '@ember/service';

export default class LayerGroupDisplaySpecialPurposeSubdistrictComponent extends Component {
  @service
  mainMap;

  @computed('model.value.geometry')
  get bounds() {
    const geometry = this.get('model.value.geometry');
    return bbox(geometry);
  }
}
