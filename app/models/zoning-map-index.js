import { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningMapIndex extends CartoGeojsonFeature {
  @attr properties;

  @alias('properties.id') title;

  @computed('title.length')
  get formattedTitle() {
    if (this.title && this.title.length > 3) {
      return `SUB PLAN OF ${this.title.slice(0, 3)}`;
    }
    return this.title;
  }
}
