import Service from '@ember/service';
import { A } from '@ember/array';
import { copy } from 'ember-copy';

const areIncomingLayerGroupsDefault = function(layerGroupsToShow, layerGroupsByDefault) {
  const layersToShowAreDefault = layerGroupsToShow.every(
    (layerGroupToShow, idx) => layerGroupToShow === layerGroupsByDefault[idx],
  );

  return layersToShowAreDefault;
};

/**
  Layer Group aggregate service
  Allows for computed properties on the aggregate state of layer groups.
  Initialized with `initializeObservers`
  @public
  @class LayerGroupService
*/
export default class LayerGroupService extends Service {
  constructor(...args) {
    super(...args);

    this.set('layerGroupRegistry', A([]));
    this.set('visibleLayerGroups', A([]));
  }

  /**
    initializeObservers
    public
    must occur _after_ the fully resolved _route_ model is set to the controller
    sets up initial state and observers for the controller
    signature is a model directly from the route
    @public
    @method initializeObservers
    @param {Array} collection of layerGroups IDs
    @param {Object} controller instance
  */
  initializeObservers(layerGroups) {
    // set initial state from QPs, grab init state from models
    const defaultVisibleLayerGroups = copy(layerGroups.filterBy('visible').mapBy('id')).sort();
    const layerGroupsToShow = this.get('visibleLayerGroups').sort();

    // check if the provided params are the default
    const isDefaultState = areIncomingLayerGroupsDefault(layerGroupsToShow, defaultVisibleLayerGroups);

    // check if QP isn't default and there are other params
    if (!isDefaultState && layerGroupsToShow.length) {
      // set initial state from query layerGroupsToShow when not default
      layerGroups.forEach((layerGroup) => {
        layerGroup.set('visible', layerGroupsToShow.any(param => (param.id || param) === layerGroup.id));

        if (layerGroup.get('layerVisibilityType') === 'singleton') {
          const { selected } = layerGroupsToShow.find(param => (param.id || param) === layerGroup.id) || {};

          if (selected) layerGroup.set('selected', selected);
        }
      });
    }

    this._modelsToParams();
    this._paramsToModels();

    this.addObserver('layerGroupRegistry.@each.selected', this, '_modelsToParams');
    this.addObserver('layerGroupRegistry.@each.visible', this, '_modelsToParams');
    this.addObserver('visibleLayerGroups.length', this, '_paramsToModels');
  }

  // translate model state to a param state object
  _modelsToParams() {
    const layerGroups = this.get('layerGroupRegistry');

    // calculate new param state object
    const newParams = layerGroups
      .filter(layerGroup => layerGroup.get('visible'))
      .map((layerGroup) => {
        if (layerGroup.get('layerVisibilityType') === 'singleton') {
          return { id: layerGroup.get('id'), selected: layerGroup.get('selected.id') };
        }

        return layerGroup.get('id');
      }).sort();

    // set the new param state object
    this.set('visibleLayerGroups', newParams);
  }

  // translate param state object to model state
  _paramsToModels() {
    const layerGroups = this.get('layerGroupRegistry');
    const params = this.get('visibleLayerGroups');

    if (Array.isArray(params) && layerGroups && params.length) {
      layerGroups.forEach((layerGroup) => {
        const foundParam = params.find(param => (param.id || param) === layerGroup.id);
        if (foundParam) {
          layerGroup.set('visible', true);

          if (foundParam.selected) {
            layerGroup.set('selected', foundParam.selected);
          }
        } else {
          layerGroup.set('visible', false);
        }
      });
    }
  }
}
