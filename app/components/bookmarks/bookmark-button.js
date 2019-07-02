import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookmarkButton extends Component {
  bookmarkableModel = null;

  @service
  store;

  @service
  metrics;

  // we don't know what kind of model this is
  // we only know that it's bookmarkable
  @computed('bookmarkableModel.bookmark')
  get saved() {
    return this.bookmarkableModel.bookmark;
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
  async createBookmark() {
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Bookmark',
      eventAction: 'Used Bookmark',
    });

    const { bookmarkableModel } = this;

    await this.store.createRecord('bookmark', {
      bookmark: bookmarkableModel,
    }).save();
  }
}
