import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Ember.Component.extend({
  bookmark: null,

  @computed('bookmark')
  saved(bookmark) {
    return !!bookmark;
  },

  actions: {
    @trackEvent('Bookmark', 'Toggle Saved', 'bookmark.id')
    toggleSaved() {
      const bookmark = this.get('bookmark');

      if (bookmark) {
        bookmark.deleteRecord();
        bookmark.save();
      } else {
        this.createBookmark();
      }
    },
  },
});
