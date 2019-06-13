import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin);

export default class MapFeature extends mappableRoute {
}
