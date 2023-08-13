import config from 'labs-zola/config/environment';
import LayerRecordComponent from './-base';

const { specialDistrictCrosswalk } = config;

export default class SpecialPurposeDistrictRecordComponent extends LayerRecordComponent {
  get readMoreLink() {
    const name = this.model.sdname;
    const [, [anchorName, boroName]] = specialDistrictCrosswalk.find(
      ([dist]) => dist === name
    ) || [[], []];
    return `https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-${boroName}.page#${anchorName}`;
  }
}
