import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import trackEvent from '../utils/track-event';

export default class BookmarkButton extends Component {
  bookmark = null;

  @service
  metrics;

  saved(bookmark) {
    return !!bookmark;
  }

  @trackEvent
  @action
  toggleSaved() {
    const { bookmark } = this;
    bookmark.then((resolvedBookmark) => {
      if (resolvedBookmark) {
        resolvedBookmark.deleteRecord();
        resolvedBookmark.save();
      } else {
        this.createBookmark();
      }
    });
  }
}
