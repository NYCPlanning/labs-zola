import Component from '@ember/component';
import bbox from '@turf/bbox';
import { computed } from '@embert/object';
import { inject as service } from '@ember/service';

export default class LayerGroupDisplayZoningMapAmendmentComponent extends Component {
  @service
  mainMap;

  @computed('model.value.effective')
  get effectiveDisplay() {
    return import('moment').then(({ default: moment }) => {
      const effective = this.get('model.value.effective');

      if (effective) {
        return moment(effective).utc().format('LL');
      }
      return 'To be determined';
    });
  }

  @computed('model.value.geometry')
  get bounds() {
    const geometry = this.get('model.value.geometry');
    return bbox(geometry);
  }
}
