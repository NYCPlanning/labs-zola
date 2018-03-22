import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Controller.extend({

  @computed('model.primaryzone')
  primaryzoneURL(primaryzone) {
    let url = '';
    if ((primaryzone === 'c1') || (primaryzone === 'c2')) {
      url = 'c1-c2';
    } else if (primaryzone === 'c3') {
      url = 'c3-c3a';
    } else {
      url = primaryzone;
    }
    return url;
  },

});
