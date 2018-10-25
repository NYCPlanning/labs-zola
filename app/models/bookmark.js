import DS from 'ember-data';
import { computed } from '@ember-decorators/object';
import { attr, belongsTo } from '@ember-decorators/data';

const { PromiseObject, Model } = DS;

export default class BookmarkModel extends Model {
  @belongsTo('bookmark', { inverse: 'bookmark' }) bookmark;

  @attr('string') address;

  @attr() coordinates;

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
