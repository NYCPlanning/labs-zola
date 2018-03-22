import Controller from '@ember/controller';
import Bookmarkable from '../mixins/bookmarkable';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import specialPurposeCrosswalk from '../utils/special-purpose-crosswalk';

export default Controller.extend(Bookmarkable, {
  @computed('model.value.sdname')
  readMoreLink(name) {
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  },
});
