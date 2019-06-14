import Component from '@ember/component';
import { computed } from '@ember/object';
import specialPurposeCrosswalk from 'labs-zola/utils/special-purpose-crosswalk';
import bbox from '@turf/bbox';
import { inject as service } from '@ember/service';

export default class LayerGroupDisplaySpecialPurposeDistrictComponent extends Component {
  @service
  mainMap;

  @computed('model.properties.sdname')
  get readMoreLink() {
    const name = this.get('model.properties.sdname');
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];
    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }

  @computed('model.geometry')
  get bounds() {
    const geometry = this.get('model.geometry');
    return bbox(geometry);
  }
}
