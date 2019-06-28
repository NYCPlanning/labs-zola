import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import config from 'labs-zola/config/environment';
import { computed } from '@ember/object';

const { specialDistrictCrosswalk } = config;
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
    const [, [anchorName, boroName]] = specialDistrictCrosswalk
      .find(([dist]) => dist === name) || [[], []];
    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }
}
