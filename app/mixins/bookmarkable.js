import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    createBookmark() {
      console.log('creating');
      const bookmark = this.get('model.value');
      this.store.createRecord(
        'bookmark',
        { bookmark },
      ).save();
    },
  },
});
