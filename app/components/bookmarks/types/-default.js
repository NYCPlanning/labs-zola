import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../../templates/components/bookmarks/types/-default';

export default class DefaultBookmark extends Component {
  @service
  metrics;

  layout = layout;

  items = [];

  @action
  deleteBookmark(bookmark) {
    bookmark.deleteRecord();
    bookmark.save();
  }

  @action
  async captureBookmarkDownload(format) {
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Download',
      eventAction: `Downloaded Bookmark as ${format}`,
      eventLabel: 'Export',
    });
  }
}
