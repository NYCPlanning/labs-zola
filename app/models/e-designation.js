import {
  fragment,
} from 'ember-data-model-fragments/attributes';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class EDesignation extends CartoGeojsonFeature {
    @fragment('map-features/e-designation')
    properties;
}
