import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    createBookmark() {
      const bookmark = this.get('model.value');
      this.store.createRecord(
        'bookmark',
        { bookmark },
      ).save();
    },
  },
});
