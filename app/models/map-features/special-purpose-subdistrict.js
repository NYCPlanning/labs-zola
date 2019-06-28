import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';
import config from 'labs-zola/config/environment';

const { specialDistrictCrosswalk } = config;

const { attr } = DS;

// this model fragment structures the "properties"
// node of a geojson feature
export default class SpecialPurposeSubdistrictFragment extends MF.Fragment {
  @attr('string')
  splbl;

  @attr('string')
  spname;

  @computed('sdname')
  get readMoreLink() {
    const name = this.get('sdname');
    const [, [anchorName, boroName]] = specialDistrictCrosswalk
      .find(([dist]) => dist === name) || [[], []];

    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }
}
