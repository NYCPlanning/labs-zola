import Component from '@ember/component';
import bbox from '@turf/bbox';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ZoningMapAmendmentComponent extends Component {
  model = {};

  @service
  mainMap;

  @computed('model.properties.effective')
  get effectiveDisplay() {
    return import('moment').then(({ default: moment }) => {
      const effective = this.get('model.properties.effective');

      if (effective) {
        return moment(effective).utc().format('LL');
      }
      return 'To be determined';
    });
  }

  @computed('model.geometry')
  get bounds() {
    const geometry = this.get('model.geometry');
    return bbox(geometry);
  }
}
