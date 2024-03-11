import LayerRecordComponent from './-base';

export default class ZoningDistrictLongDescription extends LayerRecordComponent {
  get primaryzone() {
    const { zonedist } = this.model;
    // convert R6A to r6
    const primary = zonedist.match(/\w\d*/)[0].toLowerCase();
    return primary;
  }

  get primaryzoneCode() {
    const { zonedist } = this.model;

    const { primaryzone } = this;
    let code = '';

    if (primaryzone === 'c1' || primaryzone === 'c2') {
      code = 'c1-c2';
    } else if (primaryzone === 'c3') {
      code = 'c3-c3a';
    } else if (
      [
        'R2A',
        'R2X',
        'R3-1',
        'R3-2',
        'R3A',
        'R3X',
        'R4A',
        'R4B',
        'R4-1',
        'R5A',
        'R5B',
        'R5D',
        'R6A',
        'R6B',
        'R7A',
        'R7B',
        'R7D',
        'R7X',
        'R8A',
        'R8B',
        'R8X',
        'R9A',
        'R9D',
        'R9X',
        'R10A',
        'R10X',
      ].includes(zonedist)
    ) {
      code = zonedist;
    } else if (['R7-1', 'R7-2'].includes(zonedist)) {
      code = 'R7';
    } else {
      code = primaryzone;
    }

    return code.toUpperCase();
  }
}
