import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('bookmark')
      .then((bookmarks) => {
        // invoke their bookmarks so they're
        // ready for the whole application
        bookmarks.invoke('get', 'bookmark');
        return bookmarks;
      });
  },
});
