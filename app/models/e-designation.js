import { attr } from '@ember-data/model';
import CartoGeojsonFeature from './carto-geojson-feature';

export default class EDesignation extends CartoGeojsonFeature {
    @attr properties;
}
