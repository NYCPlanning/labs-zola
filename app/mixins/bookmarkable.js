import Mixin from '@ember/object/mixin';

export default Mixin.create({
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
