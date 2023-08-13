import Model, { attr, belongsTo, PromiseObject } from '@ember-data/model';
import { computed } from '@ember/object';

export default class BookmarkModel extends Model {
  @belongsTo('bookmark', { inverse: 'bookmark', polymorphic: true }) bookmark;

  @attr('string') address;

  @attr() coordinates;

  @computed('bookmark')
  get recordType() {
    const { bookmark } = this;
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
