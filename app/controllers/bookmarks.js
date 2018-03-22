import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { Promise } from 'rsvp';
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Controller.extend({
  mainMap: service(),
  // because we must compute the record types based on multiple
  // promises, the model uses Promise.all
  // this gets us in trouble when we need to do
  // aggregate operations (like filtering)
  @computed('model.[]')
  bookmarksSettled(bookmarks) {
    const promises = bookmarks.mapBy('recordType');

    return Promise.all(promises);
  },

  actions: {

    @trackEvent('Bookmark', 'Delete')
    deleteBookmark(record) {
      record.deleteRecord();
      record.save();
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
