import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeSubdistrict extends CartoGeojsonFeature {
  @fragment('map-features/special-purpose-subdistrict')
  properties;
}
