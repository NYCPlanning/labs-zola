import { attr } from '@ember-decorators/data';
import { computed } from '@ember-decorators/object'; // eslint-disable-line
import bbox from '@turf/bbox';
import Bookmarkable from './bookmark';

export default class MyComponent extends Bookmarkable {
  @attr()
  geometry;

  @attr('string')
  splbl;

  @attr('string')
  spname;

  @computed('geometry')
  get bounds() {
    const geometry = this.get('geometry');
    return bbox(geometry);
  }
}
