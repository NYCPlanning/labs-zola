import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeSubdistrict extends CartoGeojsonFeature {
  @fragment('map-features/special-purpose-subdistrict')
  properties;

  @alias('properties.spname')
  title;

  @alias('properties.splbl')
  subtitle;
}
