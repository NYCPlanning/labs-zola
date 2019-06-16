import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class Lot extends CartoGeojsonFeature {
  @fragment('map-features/lot')
  properties;
}
