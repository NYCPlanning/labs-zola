import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Controller.extend({
  actions: {
    createBookmark() {
      const lot = this.get('model');
      const record = { lot, title: lot.get('bbl'), subtitle: lot.get('address') };
      this.store.createRecord('bookmark', record).save();
    },
  },
});
