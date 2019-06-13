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

  @attr() properties;

  @computed('bookmark')
  get recordType() {
    const bookmark = this.get('bookmark');
    return PromiseObject.create({
      promise: bookmark.then((bmark) => {
        if (bmark) {
          return bmark.get('constructor.modelName');
        }

        return 'address';
      }),
    });
  }
}
