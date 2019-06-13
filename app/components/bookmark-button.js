import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookmarkButton extends Component {
  bookmarkableModel = null;

  // Used to group the bookmarks in display
  bookmarkType = '';

  @service
  store;

  @computed('bookmarkableModel.bookmark')
  get saved() {
    const bookmark = this.get('bookmarkableModel.bookmark');
    return !!bookmark;
  }

  @action
  async toggleSaved() {
    const { bookmark } = this.bookmarkableModel;
    const resolvedBookmark = await bookmark;
    if (resolvedBookmark) {
      resolvedBookmark.deleteRecord();
      resolvedBookmark.save();
    } else {
      this.createBookmark();
    }
  }

  @action
  createBookmark() {
    const { bookmarkableModel } = this;
    const { bookmarkType } = this;

    const bookmarkedRecord = this.store.createRecord(bookmarkType, {
      properties: bookmarkableModel.properties,
    });

    this.store.createRecord('bookmark', {
      bookmark: bookmarkedRecord,
    }).save();
  }
}
