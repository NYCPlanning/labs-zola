import Ember from 'ember';
import specialPurposeDistrictCrosswalk from '../utils/special-purpose-crosswalk';

export function makeSpecialPurposeDistrictLink([specialPurposeDistrictName]) {
  const [, [name, borough]] = specialPurposeDistrictCrosswalk
    .find(([dist]) => dist === specialPurposeDistrictName) || [null, []];
  const result = `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${borough}.page#${name}`;
  return result;
}

export default Ember.Helper.helper(makeSpecialPurposeDistrictLink);
