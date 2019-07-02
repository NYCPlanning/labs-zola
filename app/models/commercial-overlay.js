import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class CommercialOverlay extends CartoGeojsonFeature {
  @fragment('map-features/commercial-overlay')
  properties;

  @alias('properties.overlay')
  title;
}
