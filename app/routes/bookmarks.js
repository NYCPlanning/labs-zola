import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  mainMap: service(),

  model() {
    return this.store.findAll('bookmark')
      .then((bookmarks) => {
        // invoke their bookmarks so they're
        // ready for the whole application
        bookmarks.invoke('get', 'bookmark');
        return bookmarks;
      });
  },

  actions: {
    didTransition() {
      this.get('mainMap')
        .setProperties({
          selected: null,
          shouldFitBounds: false,
        });
    },
  },
});
