import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../../templates/components/bookmarks/types/-default';

export default class DefaultBookmark extends Component {
  @service metrics;

  layout = layout;

  items = [];

  @action
  deleteBookmark(bookmark) {
    bookmark.deleteRecord();
    bookmark.save();

    gtag('event', 'delete_bookmark', {
      event_category: 'Bookmark',
      event_action: 'Deleted Bookmark',
    });
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Bookmark',
      action: 'Delete',
      name: 'Deleted Bookmark',
    });
  }

  @action
  async captureBookmarkDownload(format) {
    gtag('event', 'download_bookmark', {
      event_category: 'Download',
      event_action: `Downloaded Bookmark as ${format}`,
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Download',
      action: `Downloaded Bookmark as ${format}`,
      name: 'Export',
    });
  }
}
