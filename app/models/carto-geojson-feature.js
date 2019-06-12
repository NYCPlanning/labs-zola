import DS from 'ember-data';
import Bookmarkable from './bookmark';

const { attr } = DS;

export default class GeoJsonFeatureModel extends Bookmarkable {
  @attr()
  geometry;

  @attr()
  properties;

  @attr({
    defaultValue: 'Polygon',
  })
  type;
}
