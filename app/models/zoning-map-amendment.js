import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import { alias } from '@ember/object/computed';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningMapAmendment extends CartoGeojsonFeature {
  @fragment('map-features/zoning-map-amendment')
  properties;

  @alias('properties.project_na')
  title;

  @alias('properties.lucats')
  subtitle;
}
