import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { Promise } from 'rsvp';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  mainMap: service(),
  // because we must compute the record types based on multiple
  // promises, the model uses Promise.all
  // this gets us in trouble when we need to do
  // aggregate operations (like filtering)
  @computed('model.[]')
  bookmarksSettled(bookmarks) {
    // setup a promise that resolves when all sub-promises resolve
    return new Promise((resolve) => {
      // pluck out those promises
      const promises = bookmarks.mapBy('recordType');

      // set the models values
      bookmarks.forEach((bmark) => {
        const recordType = bmark.get('recordType');

        // on re-compute, it isn't a promise anymore
        if (recordType.then) {
          bmark.get('recordType')
            .then((resolvedType) => {
              const bmarkModified = bmark;
              bmarkModified.recordType = resolvedType;
            });
        }
      });

      // resolve the outer promise when all these
      // have settled
      Promise.all(promises).then(() => {
        resolve(bookmarks);
      });
    });
  },

  @computed('bookmarksSettled')
  lots(bookmarks) {
    return bookmarks.then(
      resolved => resolved
        .filter(mark => (mark.recordType === 'lot')),
    );
  },

  @computed('bookmarksSettled')
  pins(bookmarks) {
    return bookmarks.then(
      resolved => resolved
        .filter(mark => (mark.recordType === 'address')),
    );
  },

  @computed('bookmarksSettled')
  amendments(bookmarks) {
    return bookmarks.then(
      resolved => resolved
        .filter(mark => (mark.recordType === 'zma')),
    );
  },

  actions: {
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
