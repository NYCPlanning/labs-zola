import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookmarkButton extends Component {
  bookmark = null;

  @service
  store;

  @computed('bookmark.bookmark')
  get saved() {
    const bookmark = this.get('bookmark.bookmark');
    return !!bookmark;
  }

  @action
  async toggleSaved() {
    const { bookmark } = this;
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
    const bookmark = this.get('model.value');
    this.store.createRecord(
      'bookmark',
      { bookmark },
    ).save();
  }
}
