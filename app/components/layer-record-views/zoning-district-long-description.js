import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import LayerRecordComponent from './-base';

export default class ZoningDistrictLongDescription extends LayerRecordComponent {
  @tracked primaryZoneOverride;

  @action
  setZone(newZone) {
    this.set('primaryZoneOverride', newZone);
  }

  zones = {
    C: ['C1-C2', 'C3-C3A', 'C4', 'C5', 'C6', 'C7', 'C8'],
    R: [
      'R1',
      'R2',
      'R2A',
      'R2X',
      'R3-1',
      'R3-2',
      'R3A',
      'R3X',
      'R4',
      'R4-1',
      'R4A',
      'R4B',
      'R5',
      'R5A',
      'R5B',
      'R5D',
      'R6',
      'R6A',
      'R6B',
      'R7',
      'R7A',
      'R7B',
      'R7D',
      'R7X',
      'R8',
      'R8A',
      'R8B',
      'R8X',
      'R9',
      'R9A',
      'R9D',
      'R9X',
      'R10',
      'R10A',
      'R10X',
    ],
    M: ['M1', 'M2', 'M3'],
  };

  get overflow() {
    return this.primaryzoneCode[0] === 'R';
  }

  get zoneMenuItems() {
    return this.zones[this.primaryzoneCode[0]];
  }

  get primaryzone() {
    const { zonedist } = this.model;
    // convert R6A to r6
    const primary = zonedist.match(/\w\d*/)[0].toLowerCase();
    return primary;
  }

  get primaryzoneCode() {
    if (this.primaryZoneOverride) {
      return this.primaryZoneOverride;
    }

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
