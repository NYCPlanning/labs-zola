import Controller from '@ember/controller';
import { computed as computedProp } from '@ember/object';
import { computed } from '@ember-decorators/object'; // eslint-disable-line

export default Controller.extend({
  primaryzoneURL: computedProp('model.value.primaryzone', function() {
    const primaryzone = this.get('model.value.primaryzone');
    let url = '';

    if ((primaryzone === 'c1') || (primaryzone === 'c2')) {
      url = 'c1-c2';
    } else if (primaryzone === 'c3') {
      url = 'c3-c3a';
    } else {
      url = primaryzone;
    }
    return url;
  }),
});
