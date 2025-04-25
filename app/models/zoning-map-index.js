import { attr } from '@ember-data/model';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningMapIndex extends CartoGeojsonFeature {
  @attr properties;
}
