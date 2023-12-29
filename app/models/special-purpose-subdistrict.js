import { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeSubdistrict extends CartoGeojsonFeature {
  @attr properties;

  @alias('properties.spname') title;

  @alias('properties.splbl') subtitle;
}
