import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Controller.extend({
  actions: {
    createBookmark() {
      const lot = this.get('model');
      this.store.createRecord('bookmark', { bookmark: lot }).save();
    },
  },
});
