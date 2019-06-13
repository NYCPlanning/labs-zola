import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookmarkButton extends Component {
  bookmark = null;

  // Used to group the bookmarks in display
  bookmarkType = '';

  @service
  store;

  @computed('bookmark.bookmark')
  get saved() {
    const bookmark = this.get('bookmark.bookmark');
    return !!bookmark;
  }

  @action
  async toggleSaved() {
    const { bookmark } = this.bookmark;
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
    const { bookmark } = this;
    const { bookmarkType } = this;

    this.store.createRecord('bookmark', {
      bookmark,
      recordType: bookmarkType,
    }).save();
  }
}
