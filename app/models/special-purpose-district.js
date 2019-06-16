import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class SpecialPurposeDistrict extends CartoGeojsonFeature {
  @fragment('map-features/special-purpose-district')
  properties;
}
