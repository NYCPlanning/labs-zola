import Controller from '@ember/controller';
import { computed as computedProp } from '@ember/object';
import Bookmarkable from '../mixins/bookmarkable';
import specialPurposeCrosswalk from '../utils/special-purpose-crosswalk';

export default Controller.extend(Bookmarkable, {
  readMoreLink: computedProp('model.value.sdname', function() {
    const name = this.get('model.value.sdname');
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }),
});
