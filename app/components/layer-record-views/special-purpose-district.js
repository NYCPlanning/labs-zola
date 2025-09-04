import config from 'labs-zola/config/environment';
import LayerRecordComponent from './-base';

const { specialDistrictCrosswalk } = config;

export default class SpecialPurposeDistrictRecordComponent extends LayerRecordComponent {
  get readMoreLink() {
    const name = this.model.sdname;
    const [, [anchorName]] = specialDistrictCrosswalk.find(
      ([dist]) => dist === name
    ) || [[], []];
    return `https://www.nyc.gov/content/planning/pages/zoning/zoning-districts-guide/special-purpose-districts#${anchorName}`;
  }
}
