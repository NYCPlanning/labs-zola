import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LayerGroupDisplayZoningDistrictComponent extends Component {
  @service
  mainMap;

  @computed('model.value.primaryzone')
  get primaryzoneURL() {
    const primaryzone = this.get('model.value.primaryzone');
    let url = '';

    if ((primaryzone === 'c1') || (primaryzone === 'c2')) {
      url = 'c1-c2';
    } else if (primaryzone === 'c3') {
      url = 'c3-c3a';
    } else {
      url = primaryzone;
    }

    return url;
  }

  @action
  fitBounds() {
    this.get('mainMap.setBounds').perform();
  }
}
