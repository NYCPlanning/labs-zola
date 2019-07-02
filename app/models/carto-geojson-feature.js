import DS from 'ember-data';
import bbox from '@turf/bbox';
import { computed } from '@ember/object';
import Bookmarkable from './bookmark';

const { attr } = DS;

export default class GeoJsonFeatureModel extends Bookmarkable {
  @attr()
  geometry;

  @attr()
  properties;

  @attr('string', {
    defaultValue: 'Polygon',
  })
  type;

  // generic property names to be aliased into
  // from specific models
  @attr('string')
  title

  @attr('string')
  subtitle

  @computed('geometry')
  get bounds() {
    return bbox(this.geometry);
  }
}
