import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Component.extend({
  bookmark: null,

  @computed('bookmark')
  saved(bookmark) {
    return !!get(bookmark, 'id');
  },

  actions: {
    @trackEvent('Bookmark', 'Toggle Saved', 'bookmark.id')
    toggleSaved() {
      const bookmark = this.get('bookmark');
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
