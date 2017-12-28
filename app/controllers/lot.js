import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import Bookmarkable from '../mixins/bookmarkable';

// convert 'R6A' to 'r6'
const getPrimaryZone = zonedist => zonedist.match(/\w\d*/)[0].toLowerCase();

export default Ember.Controller.extend(Bookmarkable, {
  @computed('model.taskInstance.value')
  lot(data) {
    return data;
  },

  @computed('lot.zonedist1')
  primaryzone1(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('lot.zonedist2')
  primaryzone2(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('lot.zonedist3')
  primaryzone3(zonedist) {
    return getPrimaryZone(zonedist);
  },

  @computed('lot.zonedist4')
  primaryzone4(zonedist) {
    return getPrimaryZone(zonedist);
  },
});
