import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class ZoningMapAmendment extends CartoGeojsonFeature {
  @fragment('map-features/zoning-map-amendment')
  properties;
}
