import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import specialPurposeCrosswalk from 'labs-zola/utils/special-purpose-crosswalk';
import { computed } from '@ember/object';

const { attr } = DS;

// this model fragment structures the "properties"
// node of a geojson feature
export default class SpecialPurposeDistrictFragment extends MF.Fragment {
  @attr('string')
  sdlbl;

  @attr('string')
  sdname;

  @computed('sdname')
  get readMoreLink() {
    const name = this.get('sdname');
    const [, [anchorName, boroName]] = specialPurposeCrosswalk
      .find(([dist]) => dist === name) || [[], []];
    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }
}
