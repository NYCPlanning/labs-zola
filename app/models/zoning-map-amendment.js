import { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningMapAmendment extends CartoGeojsonFeature {
  @attr properties;

  @alias('properties.project_na') title;

  @alias('properties.lucats') subtitle;
}
