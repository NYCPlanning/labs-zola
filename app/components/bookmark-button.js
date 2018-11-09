import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';
import trackEvent from '../utils/track-event';

export default class BookmarkButton extends Component {
  @argument
  bookmark = null;

  @service
  metrics;

  @computed('bookmark.bookmark')
  get saved() {
    const bookmark = this.get('bookmark.bookmark');
    return !!bookmark;
  }

  @trackEvent
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
