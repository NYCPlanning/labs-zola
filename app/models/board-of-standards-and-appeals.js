import { attr } from '@ember-data/model';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class BoardOfStandardsAndAppeals extends CartoGeojsonFeature {
  @attr properties;

  get address() {
    const { street_number, street_address, borough } = this.properties || {};

    const street = [street_number, street_address].filter(Boolean).join(' ');

    return [street, borough].filter(Boolean).join(', ');
  }

  get cases() {
    return this.properties?.cases || [];
  }
}
