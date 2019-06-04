import DS from 'ember-data';
import { computed } from '@ember/object';
import bbox from '@turf/bbox';
import Bookmarkable from './bookmark';

const { attr } = DS;

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
