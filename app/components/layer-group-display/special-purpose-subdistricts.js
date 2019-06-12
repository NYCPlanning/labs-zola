import Component from '@ember/component';
import { computed } from '@ember/object';
import Bookmarkable from 'labs-zola/mixins/bookmarkable';
import specialPurposeCrosswalk from 'labs-zola/utils/special-purpose-crosswalk';

const BookmarkableComponent = Component.extend(Bookmarkable);

export default class LayerGroupDisplaySpecialPurposeSubdistrictsComponent extends BookmarkableComponent {
  @computed('model.value.sdname')
  get readMoreLink() {
    const name = this.get('model.value.sdname');
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }
}
