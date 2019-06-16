import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningDistrict extends CartoGeojsonFeature {
  @fragment('map-features/zoning-district')
  properties;
}
