import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createBookmark() {
      const zma = this.get('model');
      this.store.createRecord(
        'bookmark',
        { bookmark: zma },
      ).save();
    },
  },
});
