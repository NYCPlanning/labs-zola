import Component from '@ember/component';
import { computed } from '@ember/object';
import bbox from '@turf/bbox';
import { inject as service } from '@ember/service';
import specialPurposeCrosswalk from 'labs-zola/utils/special-purpose-crosswalk';

export default class LayerGroupDisplaySpecialPurposeSubdistrictsComponent extends Component {
  @service
  mainMap;

  @computed('model.value.sdname')
  get readMoreLink() {
    const name = this.get('model.value.sdname');
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }

  @computed('model.value.geometry')
  get bounds() {
    const geometry = this.get('model.value.geometry');
    return bbox(geometry);
  }
}
