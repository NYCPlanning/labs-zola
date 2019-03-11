import DS from 'ember-data';
import { attr } from '@ember-decorators/data';

const { Model } = DS;

export default class BboxModel extends Model {
  @attr('array') bounds;
}
