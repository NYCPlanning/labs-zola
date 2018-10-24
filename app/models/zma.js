import DS from 'ember-data';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import bbox from '@turf/bbox';
import moment from 'moment';
import Bookmarkable from './bookmark';

export default class MyComponent extends Bookmarkable {
  geometry = DS.attr();

  ulurpno = DS.attr('string');

  project_na = DS.attr('string');

  effective = DS.attr('string');

  status = DS.attr('string');

  lucats = DS.attr('string');

  @computed('effective')
  get effectiveDisplay() {
    const effective = this.get('effective');
    if (effective) {
      return moment(effective).utc().format('LL');
    }
    return 'To be determined';
  }

  @computed('geometry')
  get bounds() {
    const geometry = this.get('geometry');
    return bbox(geometry);
  }
}
