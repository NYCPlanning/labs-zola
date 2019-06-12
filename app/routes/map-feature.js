import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin);

// query and naming information for layers
// keys are the expected routes
export const layerQueries = {

};

// responsible for mapping old layer group routes into new names
// looks up an object for querying data of a specific type
// for example, existing links may point to /zma but internally
// these should be zoning-map-amendment
export default class MapFeature extends mappableRoute {
}
