import Component from '@ember/component';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { inject as service } from '@ember/service';
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Component.extend({
  bookmark: null,

  metrics: service(),

  @computed('bookmark.bookmark')
  saved(bookmark) {
    return !!bookmark;
  },

  actions: {
    @trackEvent('Bookmark', 'Toggle Saved', 'bookmark.id')
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
    },
  },
});
