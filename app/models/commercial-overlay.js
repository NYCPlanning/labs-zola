import { computed } from '@ember-decorators/object';
import { attr } from '@ember-decorators/data';
import bbox from '@turf/bbox';
import Bookmarkable from './bookmark';

export default class MyComponent extends Bookmarkable {
  @attr()
  geometry;

  @attr('string')
  overlay;

  @computed('geometry')
  get bounds() {
    const geometry = this.get('geometry');

    return bbox(geometry);
  }
}
