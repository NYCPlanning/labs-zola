import DS from 'ember-data';
import { computed } from '@ember/object';

const {
  PromiseObject,
  Model,
  attr,
  belongsTo,
} = DS;

export default class BookmarkModel extends Model {
  @belongsTo('bookmark', { inverse: 'bookmark' }) bookmark;

  @attr('string') address;

  @attr() coordinates;

  @attr({
    defaultValue: 'address',
  }) recordType;
}
