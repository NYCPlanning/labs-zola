import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin);

const layerGroupTypeMap = {
  zma: 'zoning-map-amendment',
};

// responsible for mapping old layer group routes into new names
const normalizeTypes = type => layerGroupTypeMap[type] || type;

export default class LayerGroupRoute extends mappableRoute {
  model(params) {
    const { type: layerGroupType, id } = params;

    const normalizedLayerGroupType = normalizeTypes(layerGroupType);

    return {
      layerGroupType: normalizedLayerGroupType,
      taskInstance: this.store.findRecord(layerGroupType, id),
    };
  }
}
