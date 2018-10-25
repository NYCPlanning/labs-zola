import DS from 'ember-data';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import bbox from '@turf/bbox';
import Bookmarkable from './bookmark';

export default class MyComponent extends Bookmarkable {
  geometry = DS.attr();

  sdlbl = DS.attr('string');

  sdname = DS.attr('string');

  @computed('geometry')
  get bounds() {
    const geometry = this.get('geometry');
    return bbox(geometry);
  }
}
