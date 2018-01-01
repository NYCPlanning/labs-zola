import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import trackEvent from '../utils/track-event'; // eslint-disable-line

const { get } = Ember;

export default Ember.Component.extend({
  bookmark: null,

  @computed('bookmark')
  saved(bookmark) {
    // console.log(`saved CD: `, bookmark)
    // console.log(Ember.get(bookmark, 'id'));
    return !!get(bookmark, 'id');
  },

  actions: {
    @trackEvent('Bookmark', 'Toggle Saved', 'bookmark.id')
    toggleSaved() {
      const bookmark = this.get('bookmark');
      bookmark.then(bookmark => {
        console.log(bookmark);
        if (bookmark) {
          bookmark.deleteRecord();
          bookmark.save();
        } else {
          this.createBookmark();
        }
      });
    },
  },
});
