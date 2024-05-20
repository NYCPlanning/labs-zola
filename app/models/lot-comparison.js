import { attr } from '@ember-data/model';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class LotComparison extends CartoGeojsonFeature {
  @attr properties;

  get title() {
    return this.get('properties.address');
  }

  get subtitle() {
    return this.get('properties.bbl');
  }
}
