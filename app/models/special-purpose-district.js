import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeDistrict extends CartoGeojsonFeature {
  @fragment('map-features/special-purpose-district')
  properties;

  @alias('properties.sdname')
  title;

  @alias('properties.sdlbl')
  subtitle;
}
