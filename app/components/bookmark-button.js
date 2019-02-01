import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
// import trackEvent from '../utils/track-event';

export default class BookmarkButton extends Component {
  bookmark = null;

  @service
  metrics;

  @computed('bookmark.bookmark')
  get saved() {
    const bookmark = this.get('bookmark.bookmark');
    return !!bookmark;
  }

  // @trackEvent
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
}
