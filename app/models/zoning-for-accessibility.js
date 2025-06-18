import { attr } from '@ember-data/model';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningForAccessibility extends CartoGeojsonFeature {
  @attr properties;
}
