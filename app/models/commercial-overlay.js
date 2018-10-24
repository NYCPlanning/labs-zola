import DS from 'ember-data';
import { computed } from '@ember-decorators/object';
import bbox from '@turf/bbox';
import Bookmarkable from './bookmark';

export default class MyComponent extends Bookmarkable {
  geometry = DS.attr();

  overlay = DS.attr('string');

  @computed('geometry')
  bounds() {
    const geometry = this.get('geometry');

    return bbox(geometry);
  }
}
