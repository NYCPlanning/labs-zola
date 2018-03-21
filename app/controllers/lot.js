import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import Bookmarkable from '../mixins/bookmarkable';

export default Controller.extend(Bookmarkable, {

  @computed('lot.zonemap')
  paddedZonemap(zonemap) {
    return (`0${zonemap}`).slice(-3);
  },
});
