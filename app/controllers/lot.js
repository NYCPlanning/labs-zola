import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import Bookmarkable from '../mixins/bookmarkable';

export default Ember.Controller.extend(Bookmarkable, {

  @computed('lot.zonemap')
  paddedZonemap(zonemap) {
    return (`0${zonemap}`).slice(-3);
  },
});
