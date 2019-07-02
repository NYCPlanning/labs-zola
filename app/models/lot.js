import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class Lot extends CartoGeojsonFeature {
  @fragment('map-features/lot')
  properties;

  @alias('properties.address')
  title;

  @alias('properties.bbl')
  subtitle;
}
