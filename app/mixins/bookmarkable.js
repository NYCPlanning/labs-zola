import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    createBookmark() {
      const bookmark = this.get('model');
      this.store.createRecord(
        'bookmark',
        { bookmark },
      ).save();
    },
  },
});
