import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed as computedProp } from '@ember/object';
import { Promise } from 'rsvp';

export default Controller.extend({
  mainMap: service(),
  metrics: service(),
  // because we must compute the record types based on multiple
  // promises, the model uses Promise.all
  // this gets us in trouble when we need to do
  // aggregate operations (like filtering)

  bookmarksSettled: computedProp('model.[]', function() {
    const bookmarks = this.get('model');
    const promises = bookmarks.mapBy('recordType');

    return Promise.all(promises);
  }),

  actions: {
    deleteBookmark(bookmark) {
      bookmark.deleteRecord();
      bookmark.save();
    },
    flyTo(center = [0, 0]) {
      const mapInstance = this.get('mainMap.mapInstance');
      mapInstance.flyTo({
        center,
        zoom: 15,
      });
    },
  },
});
