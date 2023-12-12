import { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeDistrict extends CartoGeojsonFeature {
  @attr properties;

  @alias('properties.sdname') title;

  @alias('properties.sdlbl') subtitle;
}
