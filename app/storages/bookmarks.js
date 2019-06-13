import StorageArray from 'ember-local-storage/local/array';

const Storage = StorageArray.extend();

Storage.reopenClass({
  initialState() {
    return [];
  },
});

export default Storage;
